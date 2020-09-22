import renderMarkUp from '../components/renderMarkUp.js';
import localStorage from '../components/localStorage';
import navigateToFilmPage from '../components/navigateToFilmPage';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';

const refs = {
    btnQueue: null,
    btnWatched: null,
};

export default function library(chapter) {
    let filmList;
    switch (chapter) {
        case 'queue':
            filmList = localStorage.getQueueFilmsFromLS();
            break;

        case 'watched':
            filmList = localStorage.getWatchedFilmsFromLS();
            break;
    }
    if (filmList.length === 0) {
        renderMarkUp.noAddedYetPage(chapter);
    } else {
        renderMarkUp.libraryPage(filmList);
        navigateToFilmPage.addFilmCardClickListeners();
    }
    libraryChaptersBtnsListeners();
    turnChaptersButtons(chapter);
}

function libraryChaptersBtnsListeners() {
    refs.btnQueue = document.querySelector('#js-btn-queue');
    refs.btnWatched = document.querySelector('#js-btn-watched');

    refs.btnWatched.addEventListener('click', onWatchedBtnClickHandler);
    refs.btnQueue.addEventListener('click', onQueueBtnClickHandler);
}

function onQueueBtnClickHandler(event) {
    event.preventDefault();
    window['router'].navigate('library/queue');
}

function onWatchedBtnClickHandler(event) {
    event.preventDefault();
    window['router'].navigate('library/watched');
}
function turnChaptersButtons(chapter) {
    switch (chapter) {
        case 'queue':
            refs.btnQueue.dataset.status = 'selected';
            refs.btnWatched.dataset.status = 'unselected';
            break;
        case 'watched':
            refs.btnWatched.dataset.status = 'selected';
            refs.btnQueue.dataset.status = 'unselected';
            break;
    }
}
