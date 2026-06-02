import { tracks } from "../core/data.js";
import { createTrackCard } from "../components/trackCard.js";
import { getCurrentUser } from "../features/auth/auth.js";

export default function libraryView() {
    const user = getCurrentUser();

    if (!user) {
        return `
            <h1 class="page-title">Login first</h1>
        `;
    }

    const favoriteTracks = tracks.filter(
        track =>
            user.favorites.includes(
                track.id
            )
    );

    if (favoriteTracks.length === 0) {
    return `
        <h1 class="page-title">Your Favorites</h1>
        <h2>No favorite tracks yet.</h2>
    `;
}

    return `
        <h1 class="page-title">Your Favorites</h1>

        <div class="tracks-grid">
            ${favoriteTracks
                .map(createTrackCard)
                .join("")}
        </div>
    `;
    
}
