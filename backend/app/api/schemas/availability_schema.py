from pydantic import BaseModel
from datetime import datetime

class SubmitAvailabilityRequest(BaseModel):
    session_uuid: str
    name: str
    event_name: str
    start_date: str
    end_date: str | None


class AvailabilityResponse(BaseModel):
    name: str
    event_name: str
    start_date: datetime
    end_date: datetime | None

    class Config:
        orm_mode = True
