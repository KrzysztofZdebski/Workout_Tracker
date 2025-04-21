from flask import Blueprint, make_response, jsonify, request
from .controller import AuthController


auth_bp = Blueprint('auth', __name__)
auth_controller = AuthController()
@auth_bp.route('/', methods=['GET'])
def index():
    """ Example endpoint with simple greeting.
    ---
    tags:
      - Authentication
    
    """
    result=auth_controller.index()
    return make_response(jsonify(data=result))
      
@auth_bp.post('/login')
def login():
    """ Example endpoint for user login.
    ---
    tags:
      - Authentication
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
              example: "user123"
            password:
              type: string
              example: "securepassword"
    responses:
      200:
        description: Login successful
        schema:
          type: object
          properties:
            data:
              type: object
              properties:
                message:
                  type: string
                  example: "Login successful!"
    """
    result = auth_controller.login(request)
    return make_response(jsonify(data=result))

@auth_bp.post('/register')
def register():
    """ Example endpoint for user registering.
    ---
    tags:
      - Authentication
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
              example: "user123"
            email:
                type: string
                example: "example@gmail.com"
            password:
              type: string
              example: "securepassword"
    responses:
      201:
        description: Register successful
        schema:
        type: object
        properties:
          data:
          type: object
          properties:
            message:
            type: string
            example: "Register successful!"
      409:
        description: User already exists
        schema:
        type: object
        properties:
          data:
          type: object
          properties:
            message:
            type: string
            example: "User already exists!"
      400:
        description: Missing required fields
        schema:
        type: object
        properties:
          data:
          type: object
          properties:
            message:
            type: string
            example: "Missing required fields!"
    """
    result = auth_controller.register(request)
    return make_response(jsonify(data=result))

@auth_bp.post('/logout')
def logout():
    """ Example endpoint for user logout."""
    result = auth_controller.logout(request)
    return make_response(jsonify(data=result))