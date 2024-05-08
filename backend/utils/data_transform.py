import pandas as pd
from . import log_parser
import httpagentparser 
from .geo_location import extract_geolocation_from_df
import server_statistics
from utils.dataframe_utils import concatenate_with_index_check
import post_process_data_for_frontend as post_processor

def read_json(json_file_path):
    """
    Read a JSON file and return a DataFrame.
    """
    return pd.read_json(json_file_path, orient='index')


def split_return_status(df):
    """
    Split 'Return Status' column into status code and response size.
    """
    df[['Status Code', 'Response Size']] = df['Return Status'].str.split(expand=True).astype(int)
    df.drop(columns=['Return Status'], inplace=True)
    return df

def unique_visitors(df):
    return df['IP Address'].nunique()

def parse_browser_info(df):
    browser_info_list = []
    for browser in df['Browser Info']:
        try:
            response = httpagentparser.detect(browser)
            platform_name = response['platform']['name']
            if platform_name is not None:
                info = {
                    'Platform Name': platform_name,
                    'Operating System': response['os']['name'],
                    'Browser': response['browser']['name'],
                }
                info['Bot'] = response['bot']
                browser_info_list.append(info)
            else:
                info = {
                    'Platform Name': 'Unknown',
                    'Operating System': 'Bots',
                    'Browser': 'Bots',
                    'Bot': True
                }
                browser_info_list.append(info)
        except Exception as e:
            print(f"Error parsing browser info: {e}")
    df.drop(columns=['Browser Info'], inplace=True)
    return browser_info_list


def split_http_status(df):
    """
    Split 'HTTP Status' column into HTTP method, requested URL, and HTTP protocol.
    """
    df[['HTTP Method', 'Requested URL', 'HTTP Protocol']] = df['HTTP Status'].str.split(expand=True)
    df.drop(columns=['HTTP Status'], inplace=True)
    return df


def format_timestamp(df):
    """
    Format 'Time Stamp' column into a standard format.
    """
    df['Time Stamp'] = pd.to_datetime(df['Time Stamp'], format='%d/%b/%Y:%H:%M:%S %z').dt.strftime('%Y-%m-%d %H:%M:%S')
    return df

def read_and_transform_log_file(file_path):
    # Parse log file and perform data transformations
    file_content = log_parser.read_file(file_path)
    parsed_file = log_parser.parse_regex(file_content)
    df = log_parser.dictionary_to_dataframe(parsed_file)

    df = split_return_status(df)
    df = split_http_status(df)

    # Parse user agents
    parsed_user_agents_data = parse_browser_info(df)
    
    # Turn parsed_user_agents to DataFrame
    parsed_user_agents_df = pd.DataFrame(parsed_user_agents_data)
    
    # Reset indices of both DataFrames and concatinate
    if not df.index.equals(parsed_user_agents_df.index):
        df.reset_index(drop=True, inplace=True)
        parsed_user_agents_df.reset_index(drop=True, inplace=True)
    
    df = pd.concat([df, parsed_user_agents_df], axis=1)

    df = format_timestamp(df)
    df.dropna(inplace=True)

    #get geolocation data
    df = extract_geolocation_from_df(df)

    # Convert DataFrame to dictionary
    df_dict = df.to_dict(orient='records')

    # Apply geolocation extraction
    geolocation_data = post_processor.post_process_geolocation_data(df_dict)

    print('___COLUMNS CONTAINING NULL VALUES__')
    print('Contains null values: ', df.isnull().any().any())
    print('Total number of null values After: ', df.isnull().sum().sum())

    # Calculate server statistics
    media_count, css_count, js_count, total_static_files_count = server_statistics.categorize_static_files(df)
    total_requests_count = server_statistics.total_requests(df)
    not_found_404_count = server_statistics.Not_Found_404(df)
    total_size, size_unit = server_statistics.total_response_size(df)
    redirects_count = server_statistics.redirects(df)
    unique_visitors_count = unique_visitors(df)
    # Construct server statistics dictionary
    server_stats = {
        "total_requests": total_requests_count,
        "failed_requests": server_statistics.failed_requests(df),
        "valid_requests": server_statistics.valid_requests(df),
        "not_found_404": not_found_404_count,
        "redirects": redirects_count,
        "unique_visitors": unique_visitors_count,
        "total_response_size": f"{total_size} {size_unit}",
        "static_files_statistics": {
            "media_files_count": media_count,
            "css_files_count": css_count,
            "js_files_count": js_count,
            "total_static_files_count": total_static_files_count
        }
    }

    # Save the processed JSON file in the same folder as the raw log file
    # processed_file_path = os.path.join(folder_path, f'{file.filename}.json')
    json_data = {
        "server_statistics": server_stats,
        "df": df_dict,
        "geolocation_data": geolocation_data
    }
    return json_data
    # with open(processed_file_path, 'w') as json_file:
    #     json.dump(json_data, json_file, indent=4)
