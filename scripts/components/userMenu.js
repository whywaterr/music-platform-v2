import { getCurrentUser, logout } from "../features/auth/auth.js";
import { openAuthModal } from "./modals/authModal.js";



export function renderUserMenu() {
    const user = getCurrentUser();

    if (!user) {
        return `
            <button class="login-btn">Log in</button>
        `;
    }

    return `
        <div class="user-dropdown">
            <img class="user-avatar"
                 src="/assets/images/ui/default-avatar.jpg">

            <span class="user-name">${user.username}</span>
        </div>
    `;
}