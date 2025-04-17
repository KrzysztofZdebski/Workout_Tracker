from app.db.db import db
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship, backref
from flask_security import UserMixin, RoleMixin

roles_users = db.Table(
    'roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean(), nullable=False)
    fs_uniquifier = db.Column(db.String(64), unique=True, nullable=False)
    roles = db.relationship('Role', secondary=roles_users, backref=db.backref('users', lazy='dynamic'))
    confirmed_at = db.Column(db.DateTime, nullable=True, default=None)
    tf_totp_secret = db.Column(db.String(255), nullable=True)
    tf_primary_method = db.Column(db.String(64), nullable=True)

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(255))