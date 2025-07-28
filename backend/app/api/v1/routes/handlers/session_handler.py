from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from api.models.session import Session

def fetch_session(session_id: str, db: Session):
    try:
        session = db.query(Session).filter(Session.id == session_id).first()
        return session
    except SQLAlchemyError as e:
        raise e

def add_session(session_id: str, db: Session):
    try:
        new_session = Session(id=session_id)
        db.add(new_session)
        db.commit()
        db.refresh(new_session)
        return new_session
    except SQLAlchemyError as e:
        db.rollback()
        raise e
