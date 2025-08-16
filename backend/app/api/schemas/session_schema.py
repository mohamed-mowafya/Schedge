from pydantic import BaseModel
from datetime import datetime
from api.schemas.availability_schema import AvailabilityResponse


class SessionSchema(BaseModel):
    id: int
    title: str
    session_uuid: str
    created_at: datetime
    updated_at: datetime
    availabilities: list[AvailabilityResponse]

    class Config:
        orm_mode = True


class SessionPayload(BaseModel):
    title: str
