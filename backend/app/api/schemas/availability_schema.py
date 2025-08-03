from pydantic import BaseModel

class SubmitAvailabilityRequest(BaseModel):
    session_id: str
    user_id: str
    name: str
    time_slot: str

class AvailabilityResponse(BaseModel):
    session_id: str
    user_id: str
    name: str
    time_slot: str

    class Config:
        orm_mode = True
