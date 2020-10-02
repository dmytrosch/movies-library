import renderMarkUp from '../components/renderMarkUp.js';
import localStorage from '../components/localStorage';
import navigateToFilmPage from '../components/navigateToFilmPage';
import spinner from '../components/spinner';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';
import { addSearchListener } from './search';

const refs = {
    btnQueue: null,
    btnWatched: null,
};

export function library(chapter) {
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
        addSearchListener();
    } else {
        renderMarkUp.libraryPage(filmList);
        navigateToFilmPage.addFilmCardClickListeners();
        addRemoveLibraryChapters(filmList);
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
export function removeElementFromMarkup(childElement, chapter) {
    const cardToRemove = childElement.closest('.library-chapter__film-card');
    const cardList = cardToRemove.parentNode;
    const containersChildrens = Array.from(cardList.children);
    const index = containersChildrens.indexOf(cardToRemove);
    if (index === 0 || index % 2 === 0) {
        cardToRemove.classList.add('library-chapter__film-card--remove_left');
    } else {
        cardToRemove.classList.add('library-chapter__film-card--remove_right');
    }

    setTimeout(() => {
        spinner.show();
        cardToRemove.remove();
        spinner.hide();
        if (cardList.children.length === 0) {
            renderMarkUp.noAddedYetPage(chapter);
            addSearchListener();
            libraryChaptersBtnsListeners();
        }
    }, 350);
}
