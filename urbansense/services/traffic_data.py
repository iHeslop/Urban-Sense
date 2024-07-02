import requests
import os
from datetime import datetime
from dotenv import load_dotenv
from urbansense.models.traffic_data_model import CityTrafficData, BaseTrafficData
from urbansense.db_config import db

load_dotenv()
API_KEY = os.getenv('API_KEY')

CITIES = {
    'Sydney': '-33.8688,151.2093',
    'Melbourne': '-37.8136,144.9631',
    'Brisbane': '-27.4705,153.0260',
    'Adelaide': '-34.9285,138.6007',
    'Perth': '-31.9514,115.8617',
    'Canberra': '-35.2802,149.1310'
}

API_URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"


def fetch_traffic_data(api_url, api_key, point):
    url = f"{api_url}?key={api_key}&point={point}"
    response = requests.get(url)
    if response.status_code == 200:
        print("Connected")
        return response.json()
    else:
        raise Exception(f"Failed to fetch data: {response.status_code}")


def insert_traffic_data(data, city):
    traffic_data = CityTrafficData(
        city=city,
        location=CITIES[city],
        timestamp=datetime.now(),
        current_travel_time=data['flowSegmentData']['currentTravelTime'],
        free_flow_travel_time=data['flowSegmentData']['freeFlowTravelTime'],
        free_flow_speed=data['flowSegmentData']['freeFlowSpeed'],
        current_speed=data['flowSegmentData']['currentSpeed']
    )
    print("Inserted")
    db.session.add(traffic_data)
    db.session.commit()


def populate_traffic_data():
    for city in CITIES:
        point = CITIES.get(city)
        if point:
            traffic_data = fetch_traffic_data(API_URL, API_KEY, point)
            insert_traffic_data(traffic_data, city)
            print(f"Traffic data for {city} inserted successfully!")
        else:
            print(f"City {city} not found.")


def delete_old_traffic_data():
    BaseTrafficData.delete_old_records()
