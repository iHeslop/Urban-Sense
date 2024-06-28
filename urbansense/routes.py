from flask import Blueprint, jsonify

routes_bp = Blueprint('routes', __name__)


@routes_bp.route("/")
def hello():
    return "Hello World!"
