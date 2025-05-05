from app.modules.auth.route import auth_bp
from flask import Flask, jsonify
from app.modules.calorie_counter.route import calorie_counter_bp
from app.db.db import db
from app.extensions import cors, jwt, swagger
from app.db.models import TokenBlocklist
import threading


def initialize_route(app: Flask):
    with app.app_context():
        app.register_blueprint(auth_bp, url_prefix='/auth')
        app.register_blueprint(calorie_counter_bp, url_prefix='/calorie_counter')


def initialize_db(app: Flask):
    with app.app_context():
        db.init_app(app)
        db.create_all()

def initialize_swagger(app: Flask):
    with app.app_context():
        swagger.init_app(app)
    
def initialize_cors(app: Flask):
    with app.app_context():
        cors.init_app(app, supports_credentials=True, origins=["http://localhost:3000"])

def initialize_jwt(app: Flask):
    with app.app_context():
        from app.db.models import User
        jwt.init_app(app)
        
        
        @jwt.token_in_blocklist_loader
        def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
            jti = jwt_payload["jti"]
            token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

            return token is not None

        @jwt.expired_token_loader
        def expired_token_callback(jwt_header, jwt_data):
            return jsonify({
                'message': 'Token has expired. Please log in again.',
                'error': 'token_expired'
            }), 401
        
        @jwt.invalid_token_loader
        def invalid_token_callback(error):
            return jsonify({
                'message': 'Invalid token. Please log in again.',
                'error': 'invalid_token'
            }), 401
        
        @jwt.unauthorized_loader
        def missing_token_callback(error):
            return jsonify({
                'message': 'Missing token. Please log in again.',
                'error': 'missing_token'
            }), 401
        
        @jwt.additional_claims_loader
        def add_claims_to_jwt(user):
            return {
                "username": user.username,
                "email": user.email,
            }

        return jwt

def initialize_blocklist_cleanup(app: Flask):
    import schedule, time
    from datetime import datetime, timedelta, timezone

    def delete_expired_entries(session, model, expiration_time):
        expired = datetime.now(timezone(timedelta(hours=2))) - expiration_time
        session.query(model).filter(model.created_at < expired).delete()
        session.commit()

    def run_scheduler():
        with app.app_context():
            schedule.every(10).minutes.do(delete_expired_entries, session=db.session, model=TokenBlocklist, expiration_time=app.config['JWT_REFRESH_TOKEN_EXPIRES'])
            while True:
                schedule.run_pending()
                time.sleep(1)

    # Run the scheduler in a separate thread
    scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()

