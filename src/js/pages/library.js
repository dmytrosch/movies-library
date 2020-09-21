import renderMarkUp from '../components/renderMarkUp.js';
import localStorage from '../components/localStorage';
import navigateToFilmPage from '../components/navigateToFilmPage';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';

const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';

export default function library() {
    const data = getQueueFilmsFromLS();
    sendToRenderAndAddListeners(data);
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
