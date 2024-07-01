from urbansense.db_config import db
from datetime import datetime


class TrafficAnalysisResult(db.Model):
    __tablename__ = 'traffic_analysis_results'
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(50), nullable=False)
    avg_current_speed = db.Column(db.Float, nullable=False)
    avg_free_flow_speed = db.Column(db.Float, nullable=False)
    speed_ratio = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.today)
