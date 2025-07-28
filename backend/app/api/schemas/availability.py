from pydantic import BaseModel
from typing import List, Optional

class SubmitAvailabilityRequest(BaseModel):
    session_id: str
    user_id: str
    name: Optional[str]
    time_slots: List[str]