from pydantic import BaseModel
from datetime import datetime

class SessionSchema(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class SessionPayload(BaseModel):
    title: str