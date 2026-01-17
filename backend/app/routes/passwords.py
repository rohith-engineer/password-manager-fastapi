from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.password import PasswordEntry
from app.schemas.password import PasswordCreate
from app.utils.crypto import encrypt, decrypt
from app.core.deps import get_db, get_current_user

router = APIRouter(prefix="/passwords", tags=["Passwords"])

@router.post("/")
def add_password(data: PasswordCreate,
                 db: Session = Depends(get_db),
                 user=Depends(get_current_user)):
    entry = PasswordEntry(
        website=data.website,
        username=data.username,
        encrypted_password=encrypt(data.password),
        user_id=user.id
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return {"message": "saved"}

@router.get("/")
def list_passwords(db: Session = Depends(get_db),
                   user=Depends(get_current_user)):
    rows = db.query(PasswordEntry).filter(
        PasswordEntry.user_id == user.id
    ).all()

    return [{
        "id": r.id,
        "website": r.website,
        "username": r.username,
        "password": decrypt(r.encrypted_password)
    } for r in rows]

@router.delete("/{pid}")
def delete_password(pid: int,
                    db: Session = Depends(get_db),
                    user=Depends(get_current_user)):
    row = db.query(PasswordEntry).filter(
        PasswordEntry.id == pid,
        PasswordEntry.user_id == user.id
    ).first()

    if not row:
        raise HTTPException(status_code=404, detail="Not found")

    db.delete(row)
    db.commit()
    return {"message": "deleted"}
