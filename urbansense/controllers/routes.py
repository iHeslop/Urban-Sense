from flask import Blueprint, jsonify
from urbansense.services.traffic_data import populate_traffic_data
from urbansense.data.traffic_analysis import run_spark_job
from urbansense.db_config import db
from urbansense.models.traffic_analysis_model import TrafficAnalysisResult
from urbansense.models.traffic_data_model import CityTrafficData

routes_bp = Blueprint('routes', __name__)


@routes_bp.route("/")
def home():
    return "Urban Sense Analytics Platform"

# Data Analysis / Script Routes


@routes_bp.route("/populate-traffic-data")
def populate_traffic_data_route():
    populate_traffic_data()
    return jsonify({'message': 'Traffic data populated.'}), 200


@routes_bp.route('/run-spark-job', methods=['GET'])
def trigger_spark_job():
    try:
        run_spark_job()
        return jsonify({"message": "Spark job completed successfully."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Database Routes


@routes_bp.route('/results', methods=['GET'])
def get_all_results():
    try:
        results = TrafficAnalysisResult.query.with_entities(
            TrafficAnalysisResult.city,
            TrafficAnalysisResult.speed_ratio,
            TrafficAnalysisResult.timestamp
        ).all()
        speed_ratios = [
            {"city": result.city, "speed_ratio": result.speed_ratio, "timestamp": result.timestamp} for result in results]
        return jsonify(speed_ratios), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@routes_bp.route('/city-traffic-data', methods=['GET'])
def get_all_city_traffic_data():
    try:
        results = CityTrafficData.query.all()

        result_data = [
            {
                "id": result.id,
                "city": result.city,
                "location": result.location,
                "timestamp": result.timestamp,
                "current_travel_time": result.current_travel_time,
                "free_flow_travel_time": result.free_flow_travel_time,
                "free_flow_speed": result.free_flow_speed,
                "current_speed": result.current_speed
            }
            for result in results
        ]

        return jsonify(result_data), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
