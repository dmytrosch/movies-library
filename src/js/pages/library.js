import renderMarkUp from '../components/renderMarkUp.js';
import localStorage from '../components/localStorage';

const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';

export default function library() {
    const data = getQueueFilmsFromLS();
    renderMarkUp.libraryPage(data);
    // нужно добавить проверку на длину масива в renderMarkUp.libraryPage, если длина меньше 0, то выводить для пользователя уведомление
    onBntLibraryClick();
}

function getWachedFilmsFromLS() {
    const data = localStorage.getFromLS(WATCHED_KEY_IN_LS);
    return data;
}

function getQueueFilmsFromLS() {
    const data = localStorage.getFromLS(QUEUE_KEY_IN_LS);
    return data;
}

function onBntLibraryClick() {
    const refs = {
        btnQueue: document.querySelector('#js-btn-queue'),
        btnWached: document.querySelector('#js-btn-watched'),
    };

    refs.btnWached.addEventListener('click', onWachedBtnClickHandler);
    refs.btnQueue.addEventListener('click', onQueueBtnClickHandler);
}

function onQueueBtnClickHandler(event) {
    event.preventDefault();
    const data = getQueueFilmsFromLS();
    onRenderMarkUpByBtn (data);
}

function onWachedBtnClickHandler(event) {
    event.preventDefault();
    const data = getWachedFilmsFromLS();
    onRenderMarkUpByBtn (data);
}

function onRenderMarkUpByBtn (data) {
    renderMarkUp.libraryPage(data);
    onBntLibraryClick();
}
