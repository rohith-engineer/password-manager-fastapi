🔐 Vault — Secure Password Manager (FastAPI)

A production-ready, security-first Password Manager built with FastAPI, demonstrating how real-world systems handle:

Authentication

Encryption

Secure data storage

API design

Status: Active Development — Backend + Simple Frontend included.

✨ Features
🔑 Authentication & Security

JWT-based User Registration & Login

OAuth2 Password Flow

Token-Protected APIs

AES Encryption (Fernet) for Data-at-Rest

📦 Password Management

Full CRUD Operations

Encrypted Storage (No Plaintext Secrets)

CSV Export for Secure Backups

🎲 Utilities

Strong Random Password Generator

RESTful API Design

Dockerized Deployment

🛠 Tech Stack
Layer	Technology
Backend	FastAPI (Python)
Auth	OAuth2 + JWT
Security	Cryptography (Fernet / AES-256)
Database	SQLite + SQLAlchemy
API	REST
Containers	Docker, Docker Compose
Frontend	HTML, Tailwind CSS, JavaScript
🗂 Project Structure
.
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── core/        # config, deps, security
│       ├── db/          # session, base
│       ├── models/      # user, password
│       ├── routes/      # auth.py, passwords.py, export.py
│       └── utils/       # crypto helpers
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   └── assets/
└── docker-compose.yml

⚡ Quickstart
1️⃣ Environment Setup

Create a .env file in the project root:

SECRET_KEY=your_jwt_secret_key
FERNET_KEY=your_fernet_key


Generate Fernet key:

python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"

2️⃣ Run with Docker
docker-compose build
docker-compose up

3️⃣ Access Services
Service	URL
API	http://localhost:8000

Swagger Docs	http://localhost:8000/docs
🔌 API Endpoints (Overview)
Method	Endpoint	Description
POST	/auth/register	Register user
POST	/auth/login	Obtain JWT Token
GET	/passwords	List passwords
POST	/passwords	Create password
GET	/passwords/{id}	Retrieve password
PUT	/passwords/{id}	Update password
DELETE	/passwords/{id}	Delete password
GET	/export/csv	Export as CSV
🧪 Local Development (Without Docker)
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
