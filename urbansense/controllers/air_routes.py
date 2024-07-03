import pytz
from flask import Blueprint, jsonify
from urbansense.services.air_data import populate_air_data
from urbansense.db_config import db
from urbansense.models.air_data_model import AirData

air_routes_bp = Blueprint('air_routes', __name__)


@air_routes_bp.route("/populate-air-data")
def populate_air_data_route():
    try:
        populate_air_data()
        return jsonify({'message': 'Air Quality data populated.'}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Database Routes


@air_routes_bp.route('/air-results/<city>', methods=['GET'])
def get_result_by_city(city):
    try:
        results = AirData.query.with_entities(
            AirData.city,
            AirData.timestamp,
            AirData.aqius,
            AirData.mainus
        ).filter(AirData.city == city).all()

        result_data = []
        for result in results:
            utc_timestamp = result.timestamp
            timezone_aest = pytz.timezone('Australia/Sydney')
            aest_timestamp = utc_timestamp.astimezone(timezone_aest)
            formatted_timestamp = aest_timestamp.strftime('%d/%m %H:%M')

            result_item = {
                "city": result.city,
                "aqius": result.aqius,
                "mainus": result.mainus,
                "timestamp": formatted_timestamp
            }
            result_data.append(result_item)

        return jsonify(result_data), 200

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@air_routes_bp.route('/latest-air-results', methods=['GET'])
def get_latest_results():
    try:
        subquery = db.session.query(
            AirData.city,
            db.func.max(AirData.timestamp).label(
                'latest_timestamp')
        ).group_by(AirData.city).subquery()

        results = db.session.query(AirData).join(
            subquery,
            (AirData.city == subquery.c.city) & (
                AirData.timestamp == subquery.c.latest_timestamp)
        ).all()

        result_data = []
        for result in results:
            utc_timestamp = result.timestamp
            timezone_aest = pytz.timezone('Australia/Sydney')
            aest_timestamp = utc_timestamp.astimezone(timezone_aest)
            formatted_timestamp = aest_timestamp.strftime('%d/%m %H:%M')

            result_item = {
                "city": result.city,
                "aqius": result.aqius,
                "mainus": result.mainus,
                "timestamp": formatted_timestamp
            }
            result_data.append(result_item)

        return jsonify(result_data), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
