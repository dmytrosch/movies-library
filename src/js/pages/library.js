import renderMarkUp from '../components/renderMarkUp.js';
import { globalState } from '../constants';
import {getFromLS} from '../utils/chaptersInLS'
import navigateToFilmPage from '../components/navigateToFilmPage';
import spinner from '../components/spinner';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';
import { addSearchListener } from './search';

const refs = {
    btnQueue: null,
    btnWatched: null,
};

const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalState;

export function library(chapter) {
    let filmList;
    /*
      Может это вынести у функцию типа getLibraryFilms, которая будет возвращать фильмы
      в зависимости от chapter
     */
    switch (chapter) {
        case 'queue':
            filmList = getFromLS(QUEUE_KEY_IN_LS);
            break;

        case 'watched':
            filmList = getFromLS(WATCHED_KEY_IN_LS);
            break;
    }
    if (filmList.length === 0) {
        renderMarkUp.noAddedYetPage(chapter);
        addSearchListener();
        const searchBar = document.querySelector('#search-bar');
        searchBar.classList.add('wrapper__search-bar--margin0');
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
    const containersChildren = Array.from(cardList.children);
    const index = containersChildren.indexOf(cardToRemove);
    if (index === 0 || index % 2 === 0) {
        cardToRemove.classList.add('library-chapter__film-card--remove_left');
    } else {
        cardToRemove.classList.add('library-chapter__film-card--remove_right');
    }

  /**
   * Что это за setTimeout?
   * Выглядит как костыль
   */
  setTimeout(() => {
        spinner.show();
        cardToRemove.remove();
        spinner.hide();
        if (cardList.children.length === 0) {
            renderMarkUp.noAddedYetPage(chapter);
            addSearchListener();
            const searchBar = document.querySelector('#search-bar');
            searchBar.classList.add('wrapper__search-bar--margin0');
            libraryChaptersBtnsListeners();
        }
    }, 350);
}
