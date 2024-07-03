from flask import Flask
from flask_cors import CORS
from urbansense.controllers.traffic_routes import traffic_routes_bp
from urbansense.controllers.air_routes import air_routes_bp
from urbansense.db_config import Config, db


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    app.config.update(
        broker_url='redis://localhost:6379/0',
        result_backend='redis://localhost:6379/0'
    )
    db.init_app(app)
    app.register_blueprint(traffic_routes_bp)
    app.register_blueprint(air_routes_bp)
    with app.app_context():
        db.create_all()
    return app
