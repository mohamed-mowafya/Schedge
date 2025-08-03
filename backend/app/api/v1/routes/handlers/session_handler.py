from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from api.models.session_model import SessionModel

def fetch_session(session_id: str, db: SessionModel):
    try:
        session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
        return session
    except SQLAlchemyError as e:
        raise e

def add_session(db: SessionModel, session_data: dict):
    try:
        new_session = SessionModel(**session_data)
        db.add(new_session)
        db.commit()
        db.refresh(new_session)
        return new_session
    except SQLAlchemyError as e:
        db.rollback()
        raise e
