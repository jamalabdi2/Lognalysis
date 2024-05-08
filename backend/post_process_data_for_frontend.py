def post_process_geolocation_data(dictionary_data):
    return list(map(lambda item: {
        "Country Fullname": item["Country Fullname"],
        "Country Shorthand": item["Country Shorthand"],
        "City": item["City"],
        "Latitude": item["Latitude"],
        "Longitude": item["Longitude"],
        "Region": item["Region"],
        "Timezone": item["Timezone"]
    }, dictionary_data))
