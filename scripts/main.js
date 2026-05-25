import {
    toggleFavorite
} from "./features/favorites/favorites.js";

import {
    loadTrack,
    playTrack
} from "./features/player/player.js";

import {
    getCurrentUser
} from "./features/auth/auth.js";

import {
    initPlayer
} from "./features/player/player.js";

import {
    initRouter
} from "./core/router.js";


initPlayer();
initRouter();

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