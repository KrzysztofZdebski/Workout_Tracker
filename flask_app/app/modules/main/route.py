from flask import Blueprint, make_response, jsonify
from .controller import MainController


main_bp = Blueprint('main', __name__)
main_controller = MainController()
@main_bp.route('/', methods=['GET'])
def index():
    """ 
    file: example.yml
    """
    result=main_controller.index()
    return make_response(jsonify(data=result))
      