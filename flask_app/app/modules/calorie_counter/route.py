from flask import Blueprint, make_response, jsonify
from .controller import Calorie_counterController


calorie_counter_bp = Blueprint('calorie_counter', __name__)
calorie_counter_controller = Calorie_counterController()
@calorie_counter_bp.route('/', methods=['GET'])
def index():
    """ Example endpoint with simple greeting.
    ---
    tags:
      - Example API
    responses:
      200:
        description: A simple greeting
        schema:
          type: object
          properties:
            data:
              type: object
              properties:
                message:
                  type: string
                  example: "Hello World!"
    """
    result=calorie_counter_controller.index()
    return make_response(jsonify(data=result))
      
@calorie_counter_bp.route('/test', methods=['GET'])
def test():
    """ Example endpoint with simple greeting.
    ---
    tags:
      - Example API
    responses:
      200:
        description: A simple greeting
        schema:
          type: object
          properties:
            data:
              type: object
              properties:
                message:
                  type: string
                  example: "Hello World!"
    """
    return make_response(jsonify(data={'message':'authenticated'}))