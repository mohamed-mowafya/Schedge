from pydantic import BaseModel


class SubmitAvailabilityRequest(BaseModel):
    session_uuid: str
    name: str
    event_name: str
    start_date: str
    end_date: str | None


class AvailabilityResponse(BaseModel):
    name: str
    event_name: str
    start_date: str
    end_date: str | None

    class Config:
        orm_mode = True
