const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';

export default {
    setToLS(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    getFromLS(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    getWatchedFilmsFromLS() {
        const data = this.getFromLS(WATCHED_KEY_IN_LS);
        return data;
    },
    getQueueFilmsFromLS() {
        const data = this.getFromLS(QUEUE_KEY_IN_LS);
        return data;
    },
};
