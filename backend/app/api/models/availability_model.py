from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from datetime import datetime
from database import Base


class AvailabilityModel(Base):
    __tablename__ = "availabilities"

    id = Column(Integer, primary_key=True)
    session_id = Column(String, ForeignKey("sessions.id"), nullable=False)
    user_id = Column(String, nullable=False)  # client-generated UUID
    name = Column(String, nullable=True) 
    time_slot = Column(String, nullable=False)  # ISO datetime as string
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)