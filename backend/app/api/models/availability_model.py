from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class AvailabilityModel(Base):
    __tablename__ = "availabilities"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(
        Integer, 
        ForeignKey("sessions.id", name="fk_availability_session"), 
        nullable=False
    )
    name = Column(String, nullable=False) 
    event_name = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    session = relationship("SessionModel", back_populates="availabilities")