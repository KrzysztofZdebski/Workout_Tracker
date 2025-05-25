from flask import Blueprint, make_response, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from .controller import Calorie_counterController


calorie_counter_bp = Blueprint('calorie_counter', __name__)
calorie_counter_controller = Calorie_counterController()
# @calorie_counter_bp.route('/', methods=['GET'])
# def index():
#     """ Example endpoint with simple greeting.
#     ---
#     tags:
#       - Example API
#     responses:
#       200:
#         description: A simple greeting
#         schema:
#           type: object
#           properties:
#             data:
#               type: object
#               properties:
#                 message:
#                   type: string
#                   example: "Hello World!"
#     """
#     result=calorie_counter_controller.index()
#     return make_response(jsonify(data=result))
@calorie_counter_bp.route('/product', methods=['GET'])
def get_product():
    """ Example endpoint to get product details.
    ---
    tags:
      - Product API
    parameters:
      - in: query
        name: product_barcode
        type: string
        required: true
        description: The barcode of the product to retrieve details for.
    responses:
      200:
        description: Product details
        schema:
          type: object
          properties:
            data:
              type: object
              properties:
                product_id:
                  type: integer
                  example: 1
                name:
                  type: string
                  example: "Apple"
                calories:
                  type: integer
                  example: 95
                serving_size:
                  type: string
                  example: "1 medium (182g)"
    """
    result = calorie_counter_controller.get_product(request)
    return make_response(jsonify(data=result))