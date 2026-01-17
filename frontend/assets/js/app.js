const API_BASE = "http://127.0.0.1:8000";

// ---------- AUTH ----------

async function signup(email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message || "Registered");
}

async function login(email, password) {
    const formData = new URLSearchParams();
    formData.append("username", email);   // OAuth2 expects "username"
    formData.append("password", password);

    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
    });

    const data = await res.json();

    if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "dashboard.html";
    } else {
        alert("Login failed");
    }
}

// ---------- PASSWORDS ----------
async function loadPasswords() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/passwords/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    const container = document.querySelector(".grid.grid-cols-3");
    container.innerHTML = "";

    data.forEach(p => {
        const div = document.createElement("div");
        div.className = "bg-slate-800 p-4 rounded-xl hover:bg-slate-700";
        div.innerText = `${p.website} (${p.username})`;
        container.appendChild(div);
    });
}

async function savePassword(website, username, password) {
    const token = localStorage.getItem("token");

    await fetch(`${API_BASE}/passwords/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ website, username, password })
    });

    alert("Password saved");
}

// ---------- GENERATOR ----------

async function generatePassword() {
    const res = await fetch(`${API_BASE}/generate/?length=12`, {
        method: "POST"
    });

    const data = await res.json();
    return data.password;
}

// ---------- LOGOUT ----------

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
async function askAI() {
    const q = document.getElementById("ai-input").value;
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/ai/chat?question=${encodeURIComponent(q)}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    document.getElementById("ai-response").innerText = data.reply;
}
async function exportCSV() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/export/csv`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        alert("Unauthorized or export failed");
        return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "passwords.csv";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
}
