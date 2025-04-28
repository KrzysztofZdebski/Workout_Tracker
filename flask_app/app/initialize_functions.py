from app.modules.auth.route import auth_bp
from flask import Flask
from flasgger import Swagger
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from app.modules.main.route import main_bp
from app.modules.calorie_counter.route import calorie_counter_bp
from app.db.db import db


def initialize_route(app: Flask):
    with app.app_context():
        app.register_blueprint(auth_bp, url_prefix='/auth')
        app.register_blueprint(main_bp)
        app.register_blueprint(calorie_counter_bp, url_prefix='/calorie_counter')


def initialize_db(app: Flask):
    with app.app_context():
        db.init_app(app)
        db.create_all()

def initialize_swagger(app: Flask):
    with app.app_context():
        swagger = Swagger(app)
        return swagger
    
def initialize_cors(app: Flask):
    with app.app_context():
        CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

def initialize_jwt(app: Flask):
    with app.app_context():
        jwt = JWTManager(app)
        return jwt