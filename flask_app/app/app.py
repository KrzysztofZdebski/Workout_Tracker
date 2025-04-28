from flask import Flask
from app.config.config import get_config_by_name
from app.initialize_functions import initialize_route, initialize_db, initialize_swagger, initialize_cors, initialize_jwt, initialize_blocklist_cleanup

def create_app(config=None) -> Flask:
    """
    Create a Flask application.

    Args:
        config: The configuration object to use.

    Returns:
        A Flask application instance.
    """
    app = Flask(__name__, static_folder='../static')
    if config:
        app.config.from_object(get_config_by_name(config))

    initialize_db(app)
    initialize_route(app)
    initialize_swagger(app)
    initialize_cors(app)
    initialize_jwt(app)
    initialize_blocklist_cleanup(app)

    # @app.after_request
    # def refresh_expiring_jwts(response):
    #     from flask_jwt_extended import get_jwt, get_jwt_identity, set_access_cookies, create_access_token
    #     from datetime import datetime, timedelta, timezone
    #     try:
    #         exp_timestamp = get_jwt()["exp"]
    #         now = datetime.now(timezone.utc)
    #         target_timestamp = datetime.timestamp(now + timedelta(minutes=20))
    #         if target_timestamp > exp_timestamp:
    #             access_token = create_access_token(identity=get_jwt_identity())
    #             set_access_cookies(response, access_token)
    #         return response
    #     except (RuntimeError, KeyError):
    #         # Case where there is not a valid JWT. Just return the original response
    #         return response

    return app

