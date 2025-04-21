import os
from dotenv import load_dotenv

load_dotenv()

class BaseConfig:
    """Base configuration."""
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY')
    SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')

    # no forms so no concept of flashing
    SECURITY_FLASH_MESSAGES = False
    SECURITY_REDIRECT_BEHAVIOR = "spa"

    # Need to be able to route backend flask API calls. Use 'accounts'
    # to be the Flask-Security endpoints.
    SECURITY_URL_PREFIX = '/api/accounts'

    # Turn on all the great Flask-Security features
    SECURITY_RECOVERABLE = True
    SECURITY_TRACKABLE = True
    SECURITY_CHANGEABLE = True
    SECURITY_CONFIRMABLE = True
    SECURITY_REGISTERABLE = True
    SECURITY_UNIFIED_SIGNIN = True

    # These need to be defined to handle redirects - these are part of the apps UI
    # As defined in the API documentation - they will receive the relevant context
    SECURITY_POST_CONFIRM_VIEW = "/confirmed"
    SECURITY_CONFIRM_ERROR_VIEW = "/confirm-error"
    SECURITY_RESET_VIEW = "/reset-password"
    SECURITY_RESET_ERROR_VIEW = "/reset-password-error"
    SECURITY_LOGIN_ERROR_VIEW = "/login-error"
    SECURITY_POST_OAUTH_LOGIN_VIEW = "/post-oauth-login"
    SECURITY_REDIRECT_BEHAVIOR = "spa"

    # CSRF protection is critical for all session-based browser UIs

    # enforce CSRF protection for session / browser - but allow token-based
    # API calls to go through
    SECURITY_CSRF_PROTECT_MECHANISMS = ["session", "basic"]
    SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS = True

    # Send Cookie with csrf-token. This is the default for Axios and Angular.
    SECURITY_CSRF_COOKIE_NAME = "XSRF-TOKEN"
    WTF_CSRF_CHECK_DEFAULT = False
    WTF_CSRF_TIME_LIMIT = None

    SECURITY_CSRF_COOKIE_SECURE = True  
    SECURITY_CSRF_COOKIE_HTTPONLY = True
    SECURITY_CSRF_COOKIE_SAMESITE = "Lax"

    # Two-factor authentication configurations
    SECURITY_TWO_FACTOR_ENABLED_METHODS = ['email', 'authenticator']
    SECURITY_TWO_FACTOR = True
    SECURITY_TWO_FACTOR_RESCUE_MAIL = "km.zdebski@gmail.com"
    SECURITY_TWO_FACTOR_ALWAYS_VALIDATE = False
    SECURITY_TWO_FACTOR_LOGIN_VALIDITY = "1 week"
    SECURITY_TOTP_SECRETS = {"1": "TjQ9Qa31VOrfEzuPy4VHQWPCTmRzCnFzMKLxXYiZu9B"}
    SECURITY_TOTP_ISSUER = "skibidiSigma"

    # SQLAlchemy engine options
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
    }

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')  # Set this in your environment
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')  # Set this in your environment
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER')  # Set this in your environment

    SECURITY_US_ENABLED_METHODS = ["password", "email"]
class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///development.db'
    SECURITY_REDIRECT_HOST = 'localhost:3000'
    SECURITY_CONFIRMABLE = False

class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///testing.db'

class ProductionConfig(BaseConfig):
    """Production configuration."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///production.db'


def get_config_by_name(config_name):
    """ Get config by name """
    if config_name == 'development':
        return DevelopmentConfig()
    elif config_name == 'production':
        return ProductionConfig()
    elif config_name == 'testing':
        return TestingConfig()
    else:
        return DevelopmentConfig()
