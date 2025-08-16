from sqlalchemy.orm import Session
from api.models.availability_model import AvailabilityModel
from api.models.session_model import SessionModel
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from api.schemas.availability_schema import (
    SubmitAvailabilityRequest,
)


def create_availability(db: Session, payload: SubmitAvailabilityRequest):
    try:
        payload_dict = payload.model_dump()
        session_id = (
            db.query(SessionModel)
            .filter(SessionModel.session_uuid == payload_dict["session_uuid"])
            .with_entities(SessionModel.id)
            .one_or_none()
        )

        if not session_id:
            # Fail silently to avoid session uuid enumeration.
            return

        payload_dict["session_id"] = session_id[0]
        del payload_dict["session_uuid"]

        availability = AvailabilityModel(**payload_dict)
        db.add(availability)
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=500, detail="An error occurred while submitting availability."
        )


def handle_get_availability(db: Session, session_id: str):
    try:
        return (
            db.query(AvailabilityModel)
            .filter(AvailabilityModel.session_id == session_id)
            .order_by(AvailabilityModel.time_slot.asc())
            .all()
        )

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500, detail="An error occurred while retrieving availability."
        )
