const API = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

if (!token) window.location.href = "index.html";

/* ---------- LOAD PASSWORDS ---------- */

async function loadPasswords() {
  const res = await fetch(`${API}/passwords/`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) return alert("Session expired. Login again.");

  const data = await res.json();
  const box = document.getElementById("password-list");
  const stat = document.getElementById("stat-total");

  box.innerHTML = "";
  stat.innerText = data.length;

  if (data.length === 0) {
    box.innerHTML = `<p class="text-sm text-gray-500">No passwords saved yet.</p>`;
    return;
  }

  data.forEach(p => {
    const row = document.createElement("div");
    row.className =
      "bg-white border rounded-lg p-4 flex justify-between items-center hover:shadow";

    row.innerHTML = `
      <div>
        <p class="font-medium">${p.website}</p>
        <p class="text-sm text-gray-500">${p.username}</p>
      </div>
      <button onclick="deletePassword(${p.id})"
              class="text-xs text-red-500 hover:text-red-700">Delete</button>
    `;
    box.appendChild(row);
  });
}

/* ---------- SAVE PASSWORD ---------- */

async function savePassword() {
  const password = document.getElementById("password-output").value;

  if (!password) {
    alert("Generate a password first.");
    return;
  }

  const website = prompt("Website name:");
  const username = prompt("Username / Email:");

  if (!website || !username) return;

  const res = await fetch(`${API}/passwords/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      website: website.trim(),
      username: username.trim(),
      password: password.trim()
    })
  });

  if (!res.ok) {
    alert("Save failed. Token expired or server error.");
    return;
  }

  document.getElementById("password-output").value = "";
  loadPasswords();
}


/* ---------- DELETE ---------- */

async function deletePassword(id) {
  if (!confirm("Delete this password?")) return;

  await fetch(`${API}/passwords/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  loadPasswords();
}

/* ---------- GENERATOR ---------- */

function generate() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let pwd = "";
  const len = parseInt(document.getElementById("length-value").innerText);

  for (let i = 0; i < len; i++)
    pwd += chars[Math.floor(Math.random() * chars.length)];

  document.getElementById("password-output").value = pwd;
}

function copy() {
  navigator.clipboard.writeText(document.getElementById("password-output").value);
}

function updateLength(v) {
  document.getElementById("length-value").innerText = v;
}

/* ---------- QUICK LINKS ---------- */

async function exportCSV() {
  const res = await fetch(`${API}/export/csv`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "vault-passwords.csv";
  a.click();
}

/* ---------- LOGOUT ---------- */

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

/* ---------- INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  generate();
  loadPasswords();
});
