const listeners = new Set();

export function subscribeAuth(listener) {
    listeners.add(listener);
}

export function unsubscribeAuth(listener) {
    listeners.delete(listener);
}

export function notifyAuthChange() {
    listeners.forEach(fn => fn());
}