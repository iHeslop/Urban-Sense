import requests
import os
from datetime import datetime
from dotenv import load_dotenv
from urbansense.models.air_data_model import AirData
from urbansense.db_config import db

load_dotenv()
AIR_API_KEY = os.getenv('AIR_API_KEY')


CITIES = {
    'Sydney': {
        'lat': "-33.8688",
        'lon': "151.2093"
    },
    'Melbourne': {
        'lat': "-37.8136",
        'lon': "144.9631"
    },
    'Brisbane': {
        'lat': "-27.4705",
        'lon': "153.0260"
    },
    'Adelaide': {
        'lat': "-34.9285",
        'lon': "138.6007"
    },
    'Perth': {
        'lat': "-31.9514",
        'lon': "115.8617"
    }
}

API_URL = "http://api.airvisual.com/v2/nearest_city"


def fetch_air_data(api_url, api_key, lat, lon):
    url = f"{api_url}?lat={lat}&lon={lon}&key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        print("Connected")
        return response.json()
    else:
        raise Exception(f"Failed to fetch data: {response.status_code}")


def insert_air_data(data, city):
    pollution_data = data['data']['current']['pollution']
    timestamp = datetime.strptime(
        pollution_data['ts'], '%Y-%m-%dT%H:%M:%S.%fZ')

    existing_data = AirData.query.filter_by(
        city=city, timestamp=timestamp).first()

    if existing_data:
        print(f"Data for {city} at {timestamp} already exists in the database. Skipping insertion.")
    else:
        air_data = AirData(
            city=city,
            timestamp=timestamp,
            aqius=pollution_data['aqius'],
            mainus=pollution_data['mainus'],
        )
        db.session.add(air_data)
        db.session.commit()
        print(f"Air data for {city} inserted successfully!")


def populate_air_data():
    for city, coordinates in CITIES.items():
        try:
            lat = coordinates['lat']
            lon = coordinates['lon']
            air_data = fetch_air_data(API_URL, AIR_API_KEY, lat, lon)
            insert_air_data(air_data, city)
        except Exception as e:
            print(f"Failed to insert air data for {city}: {e}")
