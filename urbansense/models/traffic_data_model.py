from datetime import datetime, timedelta
from urbansense.db_config import db


class BaseTrafficData(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)
    current_travel_time = db.Column(db.Float, nullable=False)
    free_flow_travel_time = db.Column(db.Float, nullable=False)
    free_flow_speed = db.Column(db.Float, nullable=False)
    current_speed = db.Column(db.Float, nullable=False)

    @classmethod
    def delete_old_records(cls):
        week_ago = datetime.now() - timedelta(days=7)
        cls.query.filter(cls.timestamp < week_ago).delete()
        db.session.commit()


class CityTrafficData(BaseTrafficData):
    __tablename__ = 'city_traffic_data'
    city = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)


class TrafficAnalysisResult(db.Model):
    __tablename__ = 'traffic_analysis_results'
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    avg_current_speed = db.Column(db.Float, nullable=False)
    avg_free_flow_speed = db.Column(db.Float, nullable=False)
    speed_ratio = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.today)
