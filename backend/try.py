import pandas as pd


def read_json_file(file_path):
  """
  Reads a JSON file containing server statistics and a DataFrame.

  Args:
      file_path (str): Path to the JSON file.

  Returns:
      tuple: A tuple containing two elements:
          - server_statistics (dict): A dictionary containing server statistics.
          - df (pandas.DataFrame): A pandas DataFrame containing processed log data.
  """

  try:
    with open(file_path, 'r') as json_file:
      data = pd.read_json(json_file)
      server_statistics = data["server_statistics"]
      df = data["df"]
      return server_statistics, df
  except FileNotFoundError:
    print(f"Error: JSON file not found at {file_path}")
    return None, None
  except Exception as e:
    print(f"Error reading JSON file: {e}")
    return None, None


# Example usage
file_path = '/Users/jamal/Documents/lognalysis/backend/Logs/a56222c9-5161-498a-9feb-1c2d30318d0c/jamalabdi.com.access.log.json'
server_stats, df = read_json_file(file_path)

if server_stats and df is not None:
  # Access server statistics
  total_requests = server_stats["total_requests"]
  print(f"Total Requests: {total_requests}")

  # Explore the DataFrame (df) using pandas methods
  print(df.head())  # Print the first few rows
  print(df.describe())  # Get summary statistics of numerical columns

  # Access specific data from each row (example)
  first_row = df.iloc[0]
  ip_address = first_row["IP Address"]
  status_code = first_row["Status Code"]
  print(f"First row: IP Address - {ip_address}, Status Code - {status_code}")
else:
  print("Error: Failed to read data from JSON file.")
