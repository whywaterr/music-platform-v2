import { tracks } from "./core/data.js";
import { createTrackCard } from "./components/trackCard.js";

import {
    loadTrack,
    playTrack,
    initPlayer
} from "./features/player/player.js";

const pageContent = document.querySelector(
    ".page-content"
);


function renderTracks() {
    pageContent.innerHTML =
        tracks
            .map(createTrackCard)
            .join("");
}


renderTracks();
initPlayer();


pageContent.addEventListener(
    "click",
    (e) => {
        const playBtn = e.target.closest(
            ".play-btn"
        );

        if (!playBtn) return;

        const card = playBtn.closest(
            ".track-card"
        );

        const trackId = Number(
            card.dataset.id
        );

        loadTrack(trackId);
        playTrack();
    }
);