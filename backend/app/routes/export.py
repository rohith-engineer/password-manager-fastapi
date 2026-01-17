from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import csv
from io import StringIO

from app.models.password import PasswordEntry
from app.utils.crypto import decrypt
from app.core.deps import get_db, get_current_user

router = APIRouter(prefix="/export", tags=["Export"])  # 👈 THIS LINE WAS MISSING


@router.get("/csv")
def export_csv(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    entries = db.query(PasswordEntry).filter(
        PasswordEntry.user_id == user.id
    ).all()

    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["Website", "Username", "Password", "Last Changed"])

    for p in entries:
        writer.writerow([
            p.website,
            p.username,
            decrypt(p.encrypted_password),
            p.last_changed
        ])

    return {
        "filename": "passwords.csv",
        "content": output.getvalue()
    }
