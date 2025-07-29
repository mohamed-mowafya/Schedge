from sqlalchemy import Column, String, DateTime
from datetime import datetime
from database import Base

class SessionModel(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True)  # unique ID like UUID or short hash
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now())