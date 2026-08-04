from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr


router = APIRouter(prefix="/auth", tags=["auth-service"])


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str


@router.get("/healthz")
async def healthz() -> dict[str, str]:
    return {"status": "ok", "service": "auth-service"}


@router.post("/register")
async def register(payload: RegisterRequest) -> dict[str, str]:
    return {"user_id": "user_123", "email": payload.email}


@router.post("/login")
async def login(payload: LoginRequest) -> dict[str, str]:
    if payload.password != "change-me":
        raise HTTPException(status_code=401, detail="invalid_credentials")
    return {"access_token": "jwt-placeholder", "refresh_token": "refresh-placeholder"}


@router.post("/refresh")
async def refresh() -> dict[str, str]:
    return {"access_token": "jwt-placeholder"}
