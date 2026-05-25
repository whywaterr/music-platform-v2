import { isFavorite } from "../features/favorites/favorites.js";
export function createTrackCard(track) {
    return `
        <div class="track-card" data-id="${track.id}">
            <img src="${track.cover}" alt="${track.title}">

            <div class="track-meta">
                <h1>${track.title}</h1>
                <h2>${track.artist}</h2>
            </div>

            <button class="play-btn">
                ▶
            </button>

            <button class="favorite-btn">

                ${isFavorite(track.id) ? "♥" : "♡"}

            </button>

            <button class="lyrics-btn">
                Lyrics
            </button>
        </div>
    `;
}