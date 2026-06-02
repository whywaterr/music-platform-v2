import { login, register } from "../../features/auth/auth.js";

function handleLogin(username, password) {
    const result = login(username, password);
    if (result.success) {
        closeAuthModal();
        // ❌ НЕ трогаем UI напрямую
    }
}

const modal = document.getElementById("authModal");
const content = modal.querySelector(".modal-content");
const closeBtn = modal.querySelector(".modal-close");

let mode = "login"; // login | signup

export function openAuthModal(initialMode = "login") {
    mode = initialMode;
    render();
    modal.classList.remove("hidden");
}

export function closeAuthModal() {
    modal.classList.add("hidden");
}

closeBtn.addEventListener("click", closeAuthModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeAuthModal();
});

function render() {
    if (mode === "login") {
        content.innerHTML = `
            <h2>Login</h2>
            <input id="username" placeholder="username">
            <input id="password" type="password" placeholder="password">
            <button id="loginBtn">Login</button>

            <p>
                No account?
                <a href="#" id="switch">Sign up</a>
            </p>
        `;

        document.getElementById("loginBtn").onclick = () => {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const res = login(username, password);

            if (res.success) {
                closeAuthModal();
                
            } else {
                alert("Invalid login");
            }
        };

        document.getElementById("switch").onclick = (e) => {
            e.preventDefault();
            mode = "signup";
            render();
        };
    }

    if (mode === "signup") {
        content.innerHTML = `
            <h2>Sign up</h2>
            <input id="username" placeholder="username">
            <input id="password" type="password" placeholder="password">
            <button id="signupBtn">Create account</button>

            <p>
                Already have account?
                <a href="#" id="switch">Login</a>
            </p>
        `;

        document.getElementById("signupBtn").onclick = () => {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const res = register(username, password);

            if (res.success) {
                closeAuthModal();
                
            } else {
                alert(res.error);
            }
        };

        document.getElementById("switch").onclick = (e) => {
            e.preventDefault();
            mode = "login";
            render();
        };
    }
}