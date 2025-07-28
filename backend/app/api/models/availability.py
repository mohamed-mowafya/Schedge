from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from datetime import datetime
from database import Base


class Availability(Base):
    __tablename__ = "availabilities"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, ForeignKey("sessions.id"), nullable=False)
    user_id = Column(String, nullable=False)  # client-generated UUID
    name = Column(String, nullable=True) 
    time_slot = Column(String, nullable=False)  # ISO datetime as string
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "user_id": self.user_id,
            "name": self.name,
            "time_slot": self.time_slot,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
