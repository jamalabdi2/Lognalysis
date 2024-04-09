import re
import json
import pandas as pd

def dictionary_to_dataframe(dictionary: dict):
    return pd.DataFrame.from_dict(dictionary,orient='index')


def parse_regex(file_content):
    """
    Parse log file contents using the provided regular expression pattern.
    """
    regex = r'(?P<ipaddress>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(?P<dateandtime>.*)\] "(?P<httpstatus>(GET|POST) .+ HTTP/1.1)" (?P<returnstatus>\d{3} \d+) "(.*)" "(?P<browserinfo>.*)"'
    result = {}
    for index, content in enumerate(file_content):
        match = re.match(regex, content)
        if match is not None:
            result[index] = {
                'IP Address': match.group('ipaddress'),
                'Time Stamp': match.group('dateandtime'),
                'HTTP Status': match.group('httpstatus'),
                'Return Status': match.group('returnstatus'),
                'Browser Info': match.group('browserinfo')
            }
    return result

def read_file(file_path):
    with open(file_path,'r') as f:
        return f.readlines()

def write_to_json(filename, data):
    """
    Write data to a JSON file with indentation.
    """
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

