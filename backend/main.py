from fastapi import FastAPI, File, UploadFile,HTTPException
from fastapi.middleware.cors import CORSMiddleware

from utils import log_parser, data_transform
import server_statistics
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
)
BASE_DIR = os.getcwd()
LOG_FILE_PATH = os.path.join(BASE_DIR, 'Logs')

def validate_file(filename):
    if not filename.endswith('.log'):
        raise HTTPException(status_code=400, detail= 'Only .log files allowed.')
@app.post('/uploadLogFile')
async def upload(file: UploadFile = File(...)):
    try:
        validate_file(file.filename)
        file_path = os.path.join(LOG_FILE_PATH, file.filename)
        with open(file_path, 'wb') as f:
            while contents := await file.read(1024 * 1024):
                f.write(contents)

        file_content = log_parser.read_file(file_path)
        # Parse log file and perform data transformations
        parsed_file = log_parser.parse_regex(file_content)
        df = log_parser.dictionary_to_dataframe(parsed_file)
        df = data_transform.split_return_status(df)
        df = data_transform.split_http_status(df)
        df = data_transform.extract_browser_name(df)
        df = data_transform.format_timestamp(df)

        # Calculate server statistics
        media_count, css_count, js_count, total_static_files_count = server_statistics.categorize_static_files(df)
        total_requests_count = server_statistics.total_requests(df)
        not_found_404_count = server_statistics.Not_Found_404(df)
        total_size, size_unit = server_statistics.total_response_size(df)
        redirects_count = server_statistics.redirects(df)

        # Return JSON data along with server statistics
        return {
            "server_statistics": {
                "total_requests": total_requests_count,
                "failed_requests": server_statistics.failed_requests(df),
                "valid_requests": server_statistics.valid_requests(df),
                "not_found_404": not_found_404_count,
                "redirects": redirects_count,
                "total_response_size": f"{total_size} {size_unit}",
                "static_files_statistics": {
                    "media_files_count": media_count,
                    "css_files_count": css_count,
                    "js_files_count": js_count,
                    "total_static_files_count": total_static_files_count
                }
            },
            "json_data": df.to_dict(orient='records')
        }
    except HTTPException as http_error:
        return {'Message': str(http_error)}

    except Exception as e:
        return {"Message": f"There was an error uploading file \n {e}"}
    finally:
        await file.close()
