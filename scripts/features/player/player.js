import { tracks } from "../../core/data.js";

const audio = new Audio();

let currentTrack = null;


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
}


/* PLAY */

export function playTrack() {
    audio.play();
    playBtn.textContent = "⏸";
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


/* INIT */

export function initPlayer() {
    playBtn.addEventListener(
        "click",
        togglePlay
    );
}