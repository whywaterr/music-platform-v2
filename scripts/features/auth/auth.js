import { notifyAuthChange } from "./authState.js";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";


function getUsers() {
    return JSON.parse(
        localStorage.getItem(USERS_KEY) || "[]"
    );
}

function saveUsers(users) {
    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


/* REGISTER */

export function register(username, password) {
    const users = getUsers();

    const exists = users.find(
        user => user.username === username
    );

    if (exists) {
        return {
            success: false,
            error: "User already exists"
        };
    }

    const newUser = {
        id: Date.now().toString(),
        username,
        password,
        favorites: [],
        history: []
    };

    users.push(newUser);

    saveUsers(users);

    localStorage.setItem(
        CURRENT_USER_KEY,
        newUser.id
    );

    notifyAuthChange();

    return {
        success: true
    };
}


/* LOGIN */

export function login(username, password) {
    const users = getUsers();

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    if (!user) {
        return {
            success: false
        };
    }

    localStorage.setItem(
        CURRENT_USER_KEY,
        user.id
    );

    notifyAuthChange();

    return {
        success: true
    };
    
}


/* LOGOUT */

export function logout() {
    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    notifyAuthChange();
}


/* CURRENT USER */

export function getCurrentUser() {
    const currentId =
        localStorage.getItem(
            CURRENT_USER_KEY
        );

    if (!currentId) return null;

    const users = getUsers();

    return users.find(
        user => user.id === currentId
    );
}


/* SAVE USER */

export function updateUser(updatedUser) {
    const users = getUsers();

    const newUsers =
        users.map(user =>
            user.id === updatedUser.id
                ? updatedUser
                : user
        );

    saveUsers(newUsers);
}