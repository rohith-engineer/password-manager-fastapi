import os
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(pw: str):
    return pwd.hash(pw)

def verify_password(pw, hashed):
    return pwd.verify(pw, hashed)

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
