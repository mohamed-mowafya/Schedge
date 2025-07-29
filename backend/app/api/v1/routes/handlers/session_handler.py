from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from backend.app.api.models.session_model import SessionModel

def fetch_session(session_id: str, db: SessionModel):
    try:
        session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
        return session
    except SQLAlchemyError as e:
        raise e

def add_session(session_id: str, db: SessionModel):
    try:
        new_session = SessionModel(id=session_id)
        db.add(new_session)
        db.commit()
        db.refresh(new_session)
        return new_session
    except SQLAlchemyError as e:
        db.rollback()
        raise e
