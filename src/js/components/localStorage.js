import { globalState } from '../constants';

/*
  Это все не является компонетном, а значит и не должно находиться в дериктории components
  Предлагаю вынести его в ./src/utilites/index.js или ./src/services/index.js
 */

const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalState;

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

export function setToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
export function getWatchedFilmsFromLS() {
    const data = this.getFromLS(WATCHED_KEY_IN_LS);
    return data;
}
export function getQueueFilmsFromLS() {
    const data = this.getFromLS(QUEUE_KEY_IN_LS);
    return data;
}
export function addToList(list, key, film) {
    const newList = [...list, film];
    this.setToLS(key, newList);
}
export function deleteFromList(list, filmId, key) {
    const newList = list.filter(item => item.id != filmId);
    this.setToLS(key, newList);
}
export function checkIsInList(list, filmId) {
    return list.some(item => item.id == filmId);
}
