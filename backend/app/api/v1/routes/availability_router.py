from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DBSession
from database import get_db
from api.schemas.availability_schema import (
    SubmitAvailabilityRequest,
    AvailabilityResponse,
)
from api.handlers import availability_handler
from sqlalchemy.exc import SQLAlchemyError

availability_router = APIRouter(prefix="/availability", tags=["availability"])


@availability_router.post("", response_model=dict)
def create_availability(
    payload: SubmitAvailabilityRequest,
    db: DBSession = Depends(get_db),
):
    try:
        availability_handler.create_availability(db=db, payload=payload)
        return {"status": "ok"}
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500, detail="An error occurred while creating availability."
        )


@availability_router.get("/{session_id}", response_model=list[AvailabilityResponse])
def get_all_availability(
    session_id: str,
    db: DBSession = Depends(get_db),
):
    try:
        return availability_handler.handle_get_availability(
            db=db, session_id=session_id
        )
    except SQLAlchemyError:
        raise HTTPException(
            status_code=500, detail="An error occurred while retrieving availability."
        )
