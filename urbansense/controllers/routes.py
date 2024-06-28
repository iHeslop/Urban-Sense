from flask import Blueprint, jsonify
from urbansense.services.traffic_data import populate_traffic_data

routes_bp = Blueprint('routes', __name__)


@routes_bp.route("/")
def hello():
    return "Hello World!"


@routes_bp.route("/populate_traffic_data")
def populate_traffic_data_route():
    populate_traffic_data()
    return jsonify({'message': 'Traffic data populated.'}), 200
