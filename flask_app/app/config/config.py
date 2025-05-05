from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

class BaseConfig:
    """Base configuration."""
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SECRET_KEY = os.getenv('SECRET_KEY')
    # SECURITY_PASSWORD_SALT = os.getenv('SECURITY_PASSWORD_SALT')

    #JWT-extended
    JWT_SECRET_KEY = os.getenv('FLASK_JWT_SECRET_KEY')
    JWT_TOKEN_LOCATION = ["headers","cookies"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=10)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=15)
    JWT_COOKIE_SECURE = True
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_CSRF_IN_COOKIES = True

    # SQLAlchemy engine options
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
    }

class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///development.db'
    SECURITY_REDIRECT_HOST = 'localhost:3000'
    # JWT_COOKIE_SECURE = False  # Set to False for development purposes
    # JWT_ACCESS_TOKEN_EXPIRES = timedelta(seconds=1)

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
