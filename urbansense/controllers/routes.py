from flask import Blueprint, jsonify
from urbansense.services.traffic_data import populate_traffic_data
from urbansense.data.traffic_analysis import run_spark_job

routes_bp = Blueprint('routes', __name__)


@routes_bp.route("/")
def hello():
    return "Hello World!"


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
