from flask import Flask
from flask_cors import CORS
from urbansense.controllers.routes import routes_bp
from urbansense.db_config import Config, db


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    db.init_app(app)
    app.register_blueprint(routes_bp)
    with app.app_context():
        db.create_all()

    return app
