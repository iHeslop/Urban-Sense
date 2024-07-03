from datetime import datetime
from urbansense.db_config import db


class AirData(db.Model):
    __tablename__ = 'city_air_data'
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    aqius = db.Column(db.Float, nullable=False)
    mainus = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.today)
