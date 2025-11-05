import requests
from pprint import pprint


def get_seoul_weather():
    #API KEY
    API_Key = 'da03c9b47a1792ceb8578295a527085b'
    lat = 37.56
    lon = 126.97
    url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=hourly,daily&appid={API_Key}"
    response = requests.get(url).json()
    return response

pprint(get_seoul_weather())