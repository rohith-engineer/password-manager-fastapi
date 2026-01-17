from cryptography.fernet import Fernet
import os

FERNET_KEY = os.getenv("FERNET_KEY")

if not FERNET_KEY:
    raise ValueError("FERNET_KEY is missing in environment variables")

cipher = Fernet(FERNET_KEY.encode())

def encrypt(text: str) -> str:
    return cipher.encrypt(text.encode()).decode()

def decrypt(token: str) -> str:
    return cipher.decrypt(token.encode()).decode()
