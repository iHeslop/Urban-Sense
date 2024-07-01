from flask import Blueprint, jsonify
from urbansense.services.traffic_data import populate_traffic_data
from urbansense.data.traffic_analysis import run_spark_job
from urbansense.db_config import db
from urbansense.models.traffic_analysis_model import TrafficAnalysisResult

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
