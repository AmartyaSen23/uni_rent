const API_BASE =
  ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "https://campusshare-backend.onrender.com" : "http://localhost:8080";

// 1. JWT Wrapper (Fixed: Uses native 'fetch' internally)
async function authFetch(url, options = {}) {
    const token = localStorage.getItem("authToken");
    if (!token) {
        window.location.href = "login.html";
        return;
    }
    options.headers = {
        ...options.headers,
        "Authorization": "Bearer " + token
    };
    
    // Call the REAL browser fetch here
    const response = await fetch(url, options);

    if (response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "login.html";
        return;
    }
    return response;
}

// 2. Security Sanitizer (Prevents Hacking)
function escapeHtml(text) {
    if (!text) return text;
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 3. Icon Helper
function getIcon(name) {
    // ... paste your existing getIcon logic here ...
    name = name.toLowerCase();
    if (name.includes("cycle")) return "🚲";
    return "📦";
}