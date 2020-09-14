import renderMarkUp from '../components/renderMarkUp.js';
import localStorage from '../components/localStorage';
import navigateToFilmPage from '../components/navigateToFilmPage';

const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';

export default function library() {
    const data = getQueueFilmsFromLS();
    renderMarkUp.libraryPage(data);
    // нужно добавить проверку на длину масива в renderMarkUp.libraryPage, если длина меньше 0, то выводить для пользователя уведомление
    libraryChaptersBtnsListeners();
    navigateToFilmPage.addFilmCardClickListeners();
}

function getWatchedFilmsFromLS() {
    const data = localStorage.getFromLS(WATCHED_KEY_IN_LS);
    return data;
}

function getQueueFilmsFromLS() {
    const data = localStorage.getFromLS(QUEUE_KEY_IN_LS);
    return data;
}

function libraryChaptersBtnsListeners() {
    const refs = {
        btnQueue: document.querySelector('#js-btn-queue'),
        btnWatched: document.querySelector('#js-btn-watched'),
    };

    refs.btnWatched.addEventListener('click', onWatchedBtnClickHandler);
    refs.btnQueue.addEventListener('click', onQueueBtnClickHandler);
}

function onQueueBtnClickHandler(event) {
    event.preventDefault();
    const data = getQueueFilmsFromLS();
    sendToRenderAndAddListeners(data);
}

function onWatchedBtnClickHandler(event) {
    event.preventDefault();
    const data = getWatchedFilmsFromLS();
    sendToRenderAndAddListeners(data);
}

function sendToRenderAndAddListeners(data) {
    renderMarkUp.libraryPage(data);
    libraryChaptersBtnsListeners();
}
