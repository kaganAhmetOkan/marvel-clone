// utility function for pulling and pushing items from or to
// local storage and automatically parsing or stringifying them

export function pullLocalStorage (key) {
    const result = JSON?.parse(localStorage.getItem(key));
    return result;
}

export function pushLocalStorage (key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}