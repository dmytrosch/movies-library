import globalVars from './globalVars';

/*
  Это все не является компонетном, а значит и не должно находиться в дериктории components
  Предлагаю вынести его в ./src/utilites/index.js или ./src/services/index.js
 */

const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalVars;

/*
  Предлагаю екпортировать не обьект, а каждый отдельный метод.
  К примеру:

  export const setToLS = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }
 */

/*
  Так же не понятно зачем делать обертку над обычным localStorage, это я о методе setToLS
  А так же у вы не безопасно получаете дынные из localStorage (getFromLS)
 */

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
