def valid_requests(df):
    return len(df[(df['Status Code'] >= 200) & (df['Status Code'] < 300)])

def failed_requests(df):
    return len(df[(df['Status Code'] >= 400) & (df['Status Code'] < 600)])

def total_requests(df):
    return len(df)

def Not_Found_404(df):
    return len(df[df['Status Code'] == 404])


def categorize_static_files(df):
    media, js, css = [], [], []
    for file in df['Requested URL']:
        if isinstance(file, str) and len(file) > 1:  
            if file.startswith('/static'):
                if file.endswith(('.jpg', '.jpeg', '.png', '.gif')):
                    media.append(file)
                elif file.endswith(('.js','.js.map')):
                    js.append(file)
                elif file.endswith(('.css','.css.map')):
                    css.append(file)
       

    media_files_count = len(media)
    js_files_count = len(js)
    css_files_count = len(css)
    total_static_files_count = media_files_count + js_files_count + css_files_count

    return media_files_count, css_files_count, js_files_count, total_static_files_count


def total_response_size(df):
    try:
        print(df.columns)
        response_size_dtype = df['Response Size'].dtype
        print("Data type of 'Response Size' column:", response_size_dtype)

        total_size_bytes = df['Response Size'].sum()
        total_size_mb = total_size_bytes / (1024 * 1024)  # 1 MB = 1024 * 1024 bytes
        total_size_gb = total_size_mb / 1024              # 1 GB = 1024 MB

        if total_size_gb >= 1:
            return f"{total_size_gb:.2f}", "GB"  
        else:
            return f"{total_size_mb:.2f}", "MB"  
    except Exception as e:
        print("Error occurred while calculating total response size:", e)
        print("DataFrame:")
        print(df)
        raise e


def redirects(df):
    return len(df[df['Status Code'].isin([301, 302])])
