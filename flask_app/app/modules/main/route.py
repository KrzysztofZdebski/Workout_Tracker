from flask import Blueprint, make_response, jsonify, render_template
from .controller import MainController


main_bp = Blueprint('main', __name__)
main_controller = MainController()
@main_bp.route('/', methods=['GET'])
def index():
    """ 
    file: example.yml
    """
    return render_template('main.html')
