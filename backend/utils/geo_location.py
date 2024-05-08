import ipinfo
import pandas as pd
from config.config import get_settings
from utils.dataframe_utils import concatenate_with_index_check

def get_batch_details(ip_addresses, handler):
    """
    Get batch details for multiple IP addresses using batch processing.

    Parameters:
    - ip_addresses (list): List of IP addresses to retrieve details for.
    - handler: IPinfo handler object.

    Returns:
    - dict: Dictionary containing batch details for each IP address.
    """
    try:
        batch_details = handler.getBatchDetails(ip_addresses)
        return batch_details
    except Exception as e:
        print(f"Exception occurred while getting batch details: {e}")
        return {}

def extract_useful_info(ip_addresses, handler):
    batch_details = get_batch_details(ip_addresses, handler)
    geolocation_info = []
    for ip_address, details in batch_details.items():
        # Extract relevant information for the current IP address
        geolocation_info.append({
            'IP Address': ip_address,
            'Country Fullname': details.get('country_name', ''),
            'Country Shorthand': details.get('country', ''),
            'City': details.get('city', ''),
            'Latitude': details.get('latitude', ''),
            'Longitude': details.get('longitude', ''),
            'Region': details.get('region', ''),
            'Timezone': details.get('timezone', ''),
            'Country Flag URL': details.get('country_flag_url', ''),
            'Country Flag Unicode': details.get('country_flag', {}).get('unicode', ''),
            'Continent': details.get('continent', {}).get('name', '')
        })
    return geolocation_info


def extract_geolocation_from_df(df):
    print('__here is reached__')
    ip_addresses = df['IP Address'].tolist()
    access_token = get_settings().ip_info_access_token 

    # Create handler with caching options
    handler = ipinfo.getHandler(access_token)
    
    # Get geolocation info for multiple IP addresses in batch
    geolocation_info = extract_useful_info(ip_addresses, handler)

    # Turn into DataFrame
    geolocation_df = pd.DataFrame(geolocation_info)

    # Merge geolocation_df with original df based on 'IP Address' column
    merged_df = pd.merge(df, geolocation_df, on='IP Address', how='left')
    return merged_df
