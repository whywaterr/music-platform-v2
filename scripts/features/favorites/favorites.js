import {
    getCurrentUser,
    updateUser
} from "../auth/auth.js";


export function toggleFavorite(trackId) {
    const user =
        getCurrentUser();

    if (!user) {
        alert(
            "Login first"
        );
        return;
    }

    const isFavorite =
        user.favorites.includes(
            trackId
        );

    if (isFavorite) {
        user.favorites =
            user.favorites.filter(
                id => id !== trackId
            );
    } else {
        user.favorites.push(
            trackId
        );
    }

    updateUser(user);
}


export function isFavorite(trackId) {
    const user =
        getCurrentUser();

    if (!user) return false;

    return user.favorites.includes(
        trackId
    );
}
