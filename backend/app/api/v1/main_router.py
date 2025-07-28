from fastapi import APIRouter
from api.v1.routes.availability_router import availability_router
from api.v1.routes.session_router import session_router

api_router = APIRouter()
api_router.include_router(availability_router)
api_router.include_router(session_router)

@api_router.get("/health", tags=["Health"])
def health_check():
    return {"status": "OK"}