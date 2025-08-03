from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from api.models.session_model import SessionModel
from api.v1.routes.handlers.session_handler import fetch_session, add_session
from api.schemas.session_schema import SessionPayload, SessionSchema

session_router = APIRouter(prefix="/sessions", tags=["lobby"])


@session_router.get("/{session_id}", response_model=SessionSchema)
def get_session(
    session_id: str,
    db: SessionModel = Depends(get_db),
) -> SessionSchema:
    session = fetch_session(session_id, db)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@session_router.post("/", response_model=SessionSchema)
def create_session(
    session_data: SessionPayload,
    db: SessionModel = Depends(get_db),
) -> SessionSchema:
    new_session = add_session(db, session_data.dict())
    return new_session
