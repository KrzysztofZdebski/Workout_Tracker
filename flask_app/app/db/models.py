from app.db.db import db
from sqlalchemy.orm import relationship, backref, mapped_column
import sqlalchemy as sa
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash

# class RolesUsers(db.Model):
#     __tablename__ = 'roles_users'
#     id      = mapped_column(sa.Integer(), primary_key=True)
#     user_id = mapped_column(sa.Integer(), sa.ForeignKey('user.id'))
#     role_id = mapped_column(sa.Integer(), sa.ForeignKey('role.id'))


class User(db.Model):
    __tablename__ = 'user'
    id                = mapped_column(sa.String(), primary_key=True, default=str(uuid4()))
    email             = mapped_column(sa.String(255), unique=True)
    username          = mapped_column(sa.String(255), unique=True, nullable=True)
    password          = mapped_column(sa.String(255), nullable=False)
    # last_login_at     = mapped_column(sa.DateTime())
    # current_login_at  = mapped_column(sa.DateTime())
    # last_login_ip     = mapped_column(sa.String(100))
    # current_login_ip  = mapped_column(sa.String(100))
    # login_count       = mapped_column(sa.Integer())
    # active            = mapped_column(sa.Boolean())
    # fs_uniquifier     = mapped_column(sa.String(255), unique=True, nullable=False)
    # confirmed_at      = mapped_column(sa.DateTime())
    # roles             = relationship('Role', secondary='roles_users', back_populates="users", lazy=True)
    # tf_totp_secret = db.Column(db.String(255), nullable=True)
    # tf_primary_method = db.Column(db.String(64), nullable=True)

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

# class Role(db.Model, RoleMixin):
#     __tablename__ = 'role'
#     id          = mapped_column(sa.Integer(), primary_key=True)
#     name        = mapped_column(sa.String(80), unique=True)
#     description = mapped_column(sa.String(255))
#     users       = relationship('User', secondary='roles_users', back_populates="roles", lazy=True)