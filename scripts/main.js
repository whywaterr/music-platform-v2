import {
    toggleFavorite
} from "./features/favorites/favorites.js";

import {
    renderUserMenu
} from "./components/userMenu.js";

import { subscribeAuth } from "./features/auth/authState.js";

import {
    loadTrack,
    playTrack
} from "./features/player/player.js";

import {
    getCurrentUser,
    logout
} from "./features/auth/auth.js";

import {
    initPlayer
} from "./features/player/player.js";

import {
    initRouter
} from "./core/router.js";

import { openAuthModal } from "./components/modals/authModal.js";


initPlayer();
initRouter();

function updateUserMenu() {
    document.querySelector(".user-menu").innerHTML =
        renderUserMenu();
}

updateUserMenu();

subscribeAuth(() => {
    updateUserMenu();
});

console.log(
    getCurrentUser()
);


document.addEventListener(
    "click",
    (e) => {

        const favoriteBtn =
            e.target.closest(
                ".favorite-btn"
            );

        if (favoriteBtn) {
            const card =
                favoriteBtn.closest(
                    ".track-card"
                );

            const trackId = Number(
                card.dataset.id
            );

            toggleFavorite(
                trackId
            );

            initRouter();

            return;
        }

        const playBtn =
            e.target.closest(
                ".play-btn"
            );

        if (playBtn) {
            const card =
                playBtn.closest(
                    ".track-card"
                );

            const trackId = Number(
                card.dataset.id
                );

            loadTrack(
                trackId
            );

            playTrack();
        }
    }
);
document.addEventListener("click", (e) => {
    const loginBtn = e.target.closest(".login-btn");
    if (loginBtn) {
        openAuthModal("login");
    }

    const userDropdown = e.target.closest(".user-dropdown");
    if (userDropdown) {
        logout();
    }
});