# 🔐 Vault - Secure Password Manager (FastAPI)

A production-ready, security-first password manager built with FastAPI, demonstrating best practices for: 

- **Authentication** - JWT-based secure access
- **Encryption** - AES-256 encryption for data-at-rest
- **Secure Storage** - No plaintext secrets
- **RESTful API Design** - Clean, scalable architecture

**Status:** Production-Ready (Backend + Frontend Included)

---

## 📸 Screenshots

### Login Page
[![Login](screenshots/login.png)](screenshots/login.png)

### Sign Up Page
[![Sign Up](screenshots/signup.jpeg)](screenshots/signup.jpeg)

### Dashboard
[![Dashboard](screenshots/dashboard.png)](screenshots/dashboard.png)

---

## ✨ Features

### 🔑 Authentication & Security

- JWT-based User Registration & Login
- OAuth2 Password Flow
- Token-Protected APIs
- AES-256 Encryption (Fernet) for Data-at-Rest

### 📦 Password Management

- Full CRUD Operations (Create, Read, Update, Delete)
- Encrypted Storage (No Plaintext Secrets)
- CSV Export for Secure Backups

### 🎲 Utilities

- Strong Random Password Generator
- RESTful API Design
- Dockerized Deployment

---

## 🛠 Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Backend    | FastAPI (Python)               |
| Auth       | OAuth2 + JWT                   |
| Security   | Cryptography (Fernet/AES-256)  |
| Database   | SQLite + SQLAlchemy            |
| API        | REST                           |
| Containers | Docker, Docker Compose         |
| Frontend   | HTML, Tailwind CSS, JavaScript |

---

## 🗂 Project Structure

```
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
```

---

## ⚡ Quickstart

### Prerequisites

- Docker & Docker Compose installed
- Python 3.9+ (for local development)

### 1️⃣ Environment Setup

Create a `.env` file in the project root:

```env
SECRET_KEY=your_jwt_secret_key
FERNET_KEY=your_fernet_key
```

**Generate a Fernet key:**

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

### 2️⃣ Run with Docker

```bash
docker-compose build
docker-compose up
```

### 3️⃣ Access Services

| Service      | URL                           |
|--------------|-------------------------------|
| API          | http://localhost:8000         |
| Swagger Docs | http://localhost:8000/docs    |
| Frontend     | http://localhost:8000         |

---

## 🔌 API Endpoints

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| POST   | `/auth/register`   | Register new user     |
| POST   | `/auth/login`      | Obtain JWT token      |
| GET    | `/passwords`       | List all passwords    |
| POST   | `/passwords`       | Create password       |
| GET    | `/passwords/{id}`  | Retrieve password     |
| PUT    | `/passwords/{id}`  | Update password       |
| DELETE | `/passwords/{id}`  | Delete password       |
| GET    | `/export/csv`      | Export passwords (CSV)|

---

## 🧪 Local Development (Without Docker)

### Install Dependencies

```bash
pip install -r backend/requirements.txt
```

### Run the Application

```bash
uvicorn backend.app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

---

## 🔒 Security Features

- **Password Hashing**: Bcrypt for user passwords
- **Data Encryption**:  Fernet (AES-256) for stored credentials
- **Token-Based Auth**: JWT with configurable expiration
- **HTTPS Ready**: Designed for TLS/SSL deployment

---

## 📝 License

This project is open-source and available under the MIT License.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

---

## 👤 Author

**Rohith**
- GitHub: [@rohith-engineer](https://github.com/rohith-engineer)

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!