from app.db.db import db
from app.extensions import jwt
from sqlalchemy.orm import relationship, backref, mapped_column
import sqlalchemy as sa
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'user'
    id = mapped_column(sa.String(), primary_key=True, default=str(uuid4()))
    email = mapped_column(sa.String(255), unique=True)
    username = mapped_column(sa.String(255), unique=True, nullable=True)
    password = mapped_column(sa.String(255), nullable=False)
    

    def __repr__(self):
        return f'<User {self.username}>'
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.id
    
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return User.query.filter_by(id=identity).one_or_none()

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)

class Product(db.Model):
    __tablename__ = 'product'
    id = mapped_column(sa.String(), primary_key=True, default=str(uuid4()))
    name = mapped_column(sa.String(255), nullable=False)
    calories = mapped_column(sa.Float, nullable=False)
    carbohydrates = mapped_column(sa.Float, nullable=False)
    fat = mapped_column(sa.Float, nullable=False)
    protein = mapped_column(sa.Float, nullable=False)

    def __repr__(self):
        return f'<Product {self.name}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_by_id(cls, product_id):
        return cls.query.filter_by(id=product_id).first()

class UserProductEntry(db.Model):
    __tablename__ = 'user_product_entry'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(), db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=True)
    product_barcode = db.Column(db.String(255), nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    # Optionally, add a timestamp or quantity field

    user = db.relationship('User', backref='product_entries')
    product = db.relationship('Product', backref='user_entries')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<product_id {self.product_id}, barcode {self.product_barcode}>'