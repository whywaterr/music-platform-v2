import { tracks } from "../core/data.js";
import { createTrackCard } from "../components/trackCard.js";

export default function testTracksView() {
    return `
        <section class="test-page">
            <h1>Track Test</h1>

            <div class="tracks-grid">
                ${tracks.map(createTrackCard).join("")}
            </div>
        </section>
    `;
}