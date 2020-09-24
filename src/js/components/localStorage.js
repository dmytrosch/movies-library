import globalVars from './globalVars';

const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalVars;

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
    addToList(list, key, film) {
        const newList = [...list, film];
        this.setToLS(key, newList);
    },
    deleteFromList(list, filmId, key) {
        const newList = list.filter(item => item.id != filmId);
        this.setToLS(key, newList);
    },
    checkIsInList(list, filmId) {
        return list.some(item => item.id == filmId);
    },
};
