import homeView from "../views/home.js";
import libraryView from "../views/library.js";
import forYouView from "../views/foryou.js";
import profileView from "../views/profile.js";
import settingsView from "../views/settings.js";
import notificationsView from "../views/notifications.js";
import testTracksView from "../views/testtracks.js";

const routes = {
    "/": homeView,
    "/library": libraryView,
    "/foryou": forYouView,
    "/profile": profileView,
    "/settings": settingsView,
    "/notifications": notificationsView,
    "/test-tracks": testTracksView
};


export function initRouter() {
    loadRoute();

    window.addEventListener(
        "hashchange",
        loadRoute
    );
}

function loadRoute() {
    const path =
        location.hash.slice(1) || "/";

    const page =
        routes[path] || homeView;

    document.querySelector(
        ".page-content"
    ).innerHTML = page();
}