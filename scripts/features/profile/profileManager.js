const PROFILE_KEY = "currentProfile";


export function getProfile() {
    const saved =
        localStorage.getItem(
            PROFILE_KEY
        );

    if (saved) {
        return JSON.parse(saved);
    }

    const defaultProfile = {
        id: "default",
        username: "whywaterr",
        avatar:
            "/assets/images/profile/default-avatar.jpeg",
        favorites: [],
        history: [],
        subscriptions: []
    };

    saveProfile(
        defaultProfile
    );

    return defaultProfile;
}


export function saveProfile(profile) {
    localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(profile)
    );
}