from pydantic import BaseModel
from datetime import datetime

class SessionSchema(BaseModel):
    id: int
    title: str
    session_uuid: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class SessionPayload(BaseModel):
    title: str