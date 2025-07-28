from pydantic import BaseModel
from datetime import datetime

class SessionSchema(BaseModel):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
