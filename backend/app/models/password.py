from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from app.db.base import Base

class PasswordEntry(Base):
    __tablename__ = "passwords"
    id = Column(Integer, primary_key=True, index=True)
    website = Column(String)
    username = Column(String)
    encrypted_password = Column(String)
    last_changed = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
