import { tracks } from "../../core/data.js";

const progressBar = document.querySelector(
    ".player-progress input"
);

const currentTimeEl = document.querySelector(
    ".player-progress span:first-child"
);

const durationEl = document.querySelector(
    ".player-progress span:last-child"
);

const volumeSlider = document.querySelector(
    ".player-volume input"
);

const muteBtn = document.querySelector(
    ".player-volume button"
);

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs
        .toString()
        .padStart(2, "0")}`;
}

const audio = new Audio();

let currentTrack = null;
let lastVolume = 0.3;


/* PLAYER DOM */

const playerTitle = document.querySelector(".track-title");
const playerArtist = document.querySelector(".track-artist");
const playerCover = document.querySelector(".track-info img");

const playBtn = document.querySelector(
    ".player-controls button:nth-child(2)"
);


/* LOAD TRACK */

export function loadTrack(trackId) {
    const track = tracks.find(t => t.id === trackId);

    if (!track) return;

    currentTrack = track;

    audio.src = track.audio;

    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerCover.src = track.cover;

    updateActiveTrack();
}


/* PLAY */

export function playTrack() {
    audio.play()
        .then(() => {
            playBtn.textContent = "⏸";
        })
        .catch(() => {
            playBtn.textContent = "▶";
        });
}


/* PAUSE */

export function pauseTrack() {
    audio.pause();
    playBtn.textContent = "▶";
}


/* TOGGLE */

export function togglePlay() {
    if (!currentTrack) return;

    if (audio.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
}

/* MUTE */

function toggleMute() {
    if (audio.volume > 0) {
        lastVolume = audio.volume;

        audio.volume = 0;
        volumeSlider.value = 0;

        muteBtn.textContent = "🔇";
    } else {
        audio.volume = lastVolume;
        volumeSlider.value = lastVolume * 100;

        muteBtn.textContent = "🔈";
    }
}

/* Prev/Next */
const prevBtn = document.querySelector(
    ".player-controls button:first-child"
);

const nextBtn = document.querySelector(
    ".player-controls button:last-child"
);

function playNext() {
    if (!currentTrack) return;

    const currentIndex = tracks.findIndex(
        t => t.id === currentTrack.id
    );

    const nextIndex =
        (currentIndex + 1) % tracks.length;

    loadTrack(
        tracks[nextIndex].id
    );

    playTrack();
}

function playPrev() {
    if (!currentTrack) return;

    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }

    const currentIndex = tracks.findIndex(
        t => t.id === currentTrack.id
    );

    const prevIndex =
        (currentIndex - 1 + tracks.length)
        % tracks.length;

    loadTrack(
        tracks[prevIndex].id
    );

    playTrack();
}

function savePlayerState() {
    localStorage.setItem(
        "playerState",
        JSON.stringify({
            trackId: currentTrack?.id,
            currentTime: audio.currentTime,
            paused: audio.paused
        })
    );
}
function restorePlayerState() {
    const saved = JSON.parse(
        localStorage.getItem("playerState")
    );

    if (!saved?.trackId) return;

    loadTrack(saved.trackId);

    audio.addEventListener(
        "loadedmetadata",
        () => {
            audio.currentTime =
                saved.currentTime;

            if (!saved.paused) {
                // autoplay запрещён браузером
                playBtn.textContent = "▶";
            }
        },
        { once: true }
    );
}
/* INIT */


export function initPlayer() {
    playBtn.addEventListener(
        "click",
        togglePlay
    );

    audio.addEventListener(
        "loadedmetadata",
        () => {
            durationEl.textContent =
                formatTime(audio.duration);

            progressBar.max =
                Math.floor(audio.duration);
        }
    );
    audio.addEventListener(
        "timeupdate",
        () => {
            progressBar.value =
                Math.floor(audio.currentTime);

            currentTimeEl.textContent =
                formatTime(audio.currentTime);
            savePlayerState();
        }
    );

    progressBar.addEventListener(
        "input",
        () => {
            audio.currentTime =
                progressBar.value;
        }
    );

    volumeSlider.addEventListener(
        "input",
        () => {
            audio.volume = volumeSlider.value / 100;
        }
    );

    muteBtn.addEventListener(
        "click",
        toggleMute
    );

    nextBtn.addEventListener(
        "click",
        playNext
    );

    prevBtn.addEventListener(
        "click",
        playPrev
    );
    audio.addEventListener(
        "ended",
        playNext
    );
    restorePlayerState();
}

function updateActiveTrack() {
    const allCards =
        document.querySelectorAll(
            ".track-card"
        );

    allCards.forEach(card => {
        card.classList.remove(
            "active"
        );
    });

    const currentCard =
        document.querySelector(
            `.track-card[data-id="${currentTrack.id}"]`
        );

    currentCard?.classList.add(
        "active"
    );
}


