from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from sqlalchemy.orm import Session
from backend.app.api.models.session_model import SessionModel
from api.v1.routes.handlers.session_handler import fetch_session, add_session
from api.schemas.session_schema import SessionSchema

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
    session_id: str,
    db: SessionModel = Depends(get_db),
) -> SessionSchema:
    new_session = add_session(session_id, db)
    return new_session
