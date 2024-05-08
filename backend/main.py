import os
import uuid
import json
from fastapi import FastAPI, File, UploadFile, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from utils import data_transform
import server_statistics
from config.config import get_settings



import pandas as pd
import traceback
import redis

app = FastAPI()

settings = get_settings()
redis_host = settings.redis_host
redis_port = settings.redis_port
frontend_url_ip = settings.frontend_url_ip
frontend_url_localhost = settings.frontend_url_localhost

origins = [frontend_url_ip,frontend_url_localhost]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

BASE_DIR = os.getcwd()
LOG_FILE_PATH = os.path.join(BASE_DIR, 'Logs')

#setup redis
redis_client = redis.Redis(host=redis_host,port=redis_port, db=0)
def validate_file(filename):
    if not filename.endswith('.log'):
        raise HTTPException(status_code=400, detail='Only .log files allowed.')


@app.post('/uploadLogFile')
async def upload(file: UploadFile = File(...)):
    try:
        validate_file(file.filename)
        # Generate a unique folder name for each uploaded log file
        folder_name = str(uuid.uuid4())
        folder_path = os.path.join(LOG_FILE_PATH, folder_name)

        # Create a new directory for the uploaded log file
        os.makedirs(folder_path, exist_ok=True)

        # Save the uploaded log file inside the newly created directory
        file_path = os.path.join(folder_path, file.filename)
        with open(file_path, 'wb') as f:
            while contents := await file.read(1024 * 1024):
                f.write(contents)

        # Create a response
        response = Response()
        file_directory,folder_name = os.path.split(folder_path)
       
        # Set a cookie with the processed JSON file path
        response.set_cookie(key="folder_name", value=folder_name)
        
        # Return both response and json_data
        return response
    except HTTPException as http_error:
        return {'Message': str(http_error)}
    except Exception as e:
        return {"Message": f"There was an error uploading file \n {e}"}
    finally:
        await file.close()




@app.get("/getProcessedJsonData/{folder_name}")
async def get_processed_json_data(folder_name: str):
    print(f'folder_name: {folder_name}')
    full_folder_path = os.path.join(BASE_DIR, 'Logs', folder_name)
    print('__________________________')
    print(f'folder_path: {full_folder_path}')
    print('__________________________')

    response = Response()

    try:
        if not os.path.isdir(full_folder_path):
            raise HTTPException(status_code=404, detail='Folder Not Found')

        # Connect to redis
        redis_cache = redis_client.get(full_folder_path)
        if redis_cache:
            print('[+]... Retrieving data from redis')
            print(f'Data type: {type(redis_cache)}')
            response.headers['Content-Type'] = 'application/json'
            return json.loads(redis_cache)
        else:
            print('[+].. Not in cache')
            # Iterate through files in the folder
            for file_name in os.listdir(full_folder_path):
                # Split the file name and extension
                file_name, file_extension = os.path.splitext(file_name)
                # Check if the extension is ".log"
                if file_extension.lower() == '.log':
                    # Construct the full file path
                    file_path = os.path.join(full_folder_path, f'{file_name}.log')
                    print('file_path_final: ', file_path)
                    print('____Reached here__')
                    json_data = data_transform.read_and_transform_log_file(file_path)
                    print(type(json_data))
                  
                    print("__Read successfully____")
                    # Set the response content type
                    response.headers['Content-Type'] = 'application/json'
                    # Set the cache in redis
                    redis_client.set(full_folder_path, json.dumps(json_data))
                    # Return the JSON data
                    return json_data

            # If no JSON file is found in the folder, raise an HTTPException
            raise HTTPException(status_code=404, detail='JSON File Not Found')

    except Exception as e:
        error_message = f"There was an error: {str(e)}\nStack Trace:\n{traceback.format_exc()}"
        raise HTTPException(status_code=500, detail=error_message)
