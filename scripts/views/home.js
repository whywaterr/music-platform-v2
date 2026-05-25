import { tracks } from "../core/data.js";
import { createTrackCard } from "../components/trackCard.js";

export default function homeView() {
    return `
        <section class="home-page">
            <h1>Home</h1>

            <div class="tracks-grid">
                ${tracks.map(createTrackCard).join("")}
            </div>
        </section>
    `;
}