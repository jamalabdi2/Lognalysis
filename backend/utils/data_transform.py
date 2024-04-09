import pandas as pd


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


def split_http_status(df):
    """
    Split 'HTTP Status' column into HTTP method, requested URL, and HTTP protocol.
    """
    df[['HTTP Method', 'Requested URL', 'HTTP Protocol']] = df['HTTP Status'].str.split(expand=True)
    df.drop(columns=['HTTP Status'], inplace=True)
    return df


def extract_browser_name(df):
    """
    Extract browser name from 'Browser Info' column.
    """
    df['Browser Name'] = df['Browser Info'].str.split('/').str[0]
    return df


def format_timestamp(df):
    """
    Format 'Time Stamp' column into a standard format.
    """
    df['Time Stamp'] = pd.to_datetime(df['Time Stamp'], format='%d/%b/%Y:%H:%M:%S %z').dt.strftime('%Y-%m-%d %H:%M:%S')
    return df