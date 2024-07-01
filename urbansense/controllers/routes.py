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
    try:
        populate_traffic_data()
        return jsonify({'message': 'Traffic data populated.'}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@routes_bp.route('/run-spark-job', methods=['GET'])
def trigger_spark_job():
    try:
        run_spark_job()
        return jsonify({"message": "Spark job completed successfully."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Database Routes


@routes_bp.route('/results/<city>', methods=['GET'])
def get_result_by_city(city):
    try:
        results = TrafficAnalysisResult.query.with_entities(
            TrafficAnalysisResult.city,
            TrafficAnalysisResult.speed_ratio,
            TrafficAnalysisResult.timestamp
        ).filter(TrafficAnalysisResult.city == city).all()
        speed_ratios = [
            {"city": result.city, "speed_ratio": result.speed_ratio, "timestamp": result.timestamp} for result in results]
        return jsonify(speed_ratios), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@routes_bp.route('/latest-results', methods=['GET'])
def get_latest_results():
    try:
        subquery = db.session.query(
            TrafficAnalysisResult.city,
            db.func.max(TrafficAnalysisResult.timestamp).label(
                'latest_timestamp')
        ).group_by(TrafficAnalysisResult.city).subquery()

        latest_data = db.session.query(TrafficAnalysisResult).join(
            subquery,
            (TrafficAnalysisResult.city == subquery.c.city) & (
                TrafficAnalysisResult.timestamp == subquery.c.latest_timestamp)
        ).all()

        result_data = [
            {
                "id": data.id,
                "city": data.city,
                "avg_current_speed": data.avg_current_speed,
                "avg_free_flow_speed": data.avg_free_flow_speed,
                "speed_ratio": data.speed_ratio,
                "timestamp": data.timestamp
            }
            for data in latest_data
        ]

        return jsonify(result_data), 200
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


@routes_bp.route('/latest-city-traffic-data', methods=['GET'])
def get_latest_city_traffic_data():
    try:
        subquery = db.session.query(
            CityTrafficData.city,
            db.func.max(CityTrafficData.timestamp).label('latest_timestamp')
        ).group_by(CityTrafficData.city).subquery()

        latest_data = db.session.query(CityTrafficData).join(
            subquery,
            (CityTrafficData.city == subquery.c.city) & (
                CityTrafficData.timestamp == subquery.c.latest_timestamp)
        ).all()

        result_data = [
            {
                "id": data.id,
                "city": data.city,
                "location": data.location,
                "timestamp": data.timestamp,
                "current_travel_time": data.current_travel_time,
                "free_flow_travel_time": data.free_flow_travel_time,
                "free_flow_speed": data.free_flow_speed,
                "current_speed": data.current_speed
            }
            for data in latest_data
        ]

        return jsonify(result_data), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
