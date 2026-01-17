from pydantic import BaseModel


class PasswordCreate(BaseModel):
    website: str
    username: str
    password: str
