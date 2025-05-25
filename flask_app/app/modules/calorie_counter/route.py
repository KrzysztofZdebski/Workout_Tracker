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

@calorie_counter_bp.route('/save_product', methods=['POST'])
@jwt_required()
def save_product():
    """ Endpoint to save a product.
    ---
    tags:
      - Product API
    parameters:
      - in: header
        name: Authorization
        required: true
        type: string
        description: Bearer token for authentication
      - in: body
        name: product
        description: The product details to save.
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
              example: "Apple"
            calories:
              type: number
              example: 95
            carbohydrates:
              type: number
              example: 25
            fat:
              type: number
              example: 0.3
            protein:
              type: number
              example: 0.5
            barcode:
              type: string
              example: "5900259133366"
            weight:
              type: number
              example: 100
            date:
              type: string
              format: date-time
              example: "2023-10-01T12:00:00Z"
    consumes:
      - application/json
    responses:
      201:
        description: Product saved successfully
        schema:
          type: object
          properties:
            message:
              type: string
              example: "Product saved successfully"
      400:
        description: Bad request
        schema:
          type: object
          properties:
            message:
              type: string
              example: "Missing required field: product_id"
    """
    result = calorie_counter_controller.save_product(request, current_user)
    return make_response(jsonify(data=result), 201)