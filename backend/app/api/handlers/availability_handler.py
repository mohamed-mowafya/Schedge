from sqlalchemy.orm import Session
from api.models.availability_model import AvailabilityModel
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from typing import List
from fastapi import HTTPException


def handle_submit_availability(
    db: Session,
    session_id: str,
    user_id: str,
    name: str,
    time_slots: List[str],
):
    try:
        db.query(AvailabilityModel).filter(
            AvailabilityModel.session_id == session_id, AvailabilityModel.user_id == user_id
        ).delete()

        now = datetime.utcnow()

        for slot in time_slots:
            db.add(
                AvailabilityModel(
                    session_id=session_id,
                    user_id=user_id,
                    name=name,
                    time_slot=slot,
                    created_at=now,
                    updated_at=now,
                )
            )

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
