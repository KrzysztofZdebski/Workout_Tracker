from flask import Flask
from flasgger import Swagger
from flask_cors import CORS
from app.modules.main.route import main_bp
from app.db.db import db
from app.db.models import User, Role
import flask_wtf
from flask_security import Security, SQLAlchemyUserDatastore
from flask_mail import Mail

mail = Mail()


def initialize_route(app: Flask):
    with app.app_context():
        app.register_blueprint(main_bp)


def initialize_db(app: Flask):
    with app.app_context():
        db.init_app(app)
        db.create_all()

        # Enable CSRF on all api endpoints.
        flask_wtf.CSRFProtect(app)

        # Initialize Flask-Security
        user_datastore = SQLAlchemyUserDatastore(db, User, Role)
        security = Security(app, user_datastore)

def initialize_swagger(app: Flask):
    with app.app_context():
        swagger = Swagger(app)
        return swagger
    
def initialize_cors(app: Flask):
    with app.app_context():
        CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

def initialize_mail(app):
    mail.init_app(app)

# def initialize_login(app: Flask):
#     with app.app_context():
#         # Enable CSRF on all api endpoints.
#         flask_wtf.CSRFProtect(app)

#         # Initialize Flask-Security
#         user_datastore = SQLAlchemyUserDatastore(db, User, Role)
#         security = Security(app, user_datastore)
#         fsqla.FsModels.set_db_info(db)

#         # Optionally define and set unauthorized callbacks
#         # security.unauthz_handler(<your unauth handler>)