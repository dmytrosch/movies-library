// import localStorageObj from './localStorage';
import { globalState } from '../constants';
import { removeElementFromMarkup } from '../pages/library';
import toggleButtons from '../utils/toggleButtons';
import toggleFilmsChapter from '../utils/toggleFilmsChapters';
import {
    getFromLS,
    checkIsInList,
    deleteFromList,
    addToList,
} from '../utils/chaptersInLS';

let allCardsLinks;
let filmArr;

const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalState;

export default function addBtnsListeners(filmsOnPage) {
    if (window.innerWidth < 1024) {
        return;
    }
    filmArr = filmsOnPage;
    allCardsLinks = document.querySelectorAll('.film-list__item-overlay');
    allCardsLinks = Array.from(allCardsLinks);
    const containerRef = document.querySelector('.wrapper__main-content');
    containerRef.addEventListener('click', onButtonClickHandler);
    monitorButtonStatusText();
}
function onButtonClickHandler(event) {
    event.preventDefault();
    const element = event.target;
    if (element.nodeName === 'BUTTON') {
        let chapter;
        const filmId = element.dataset.filmid;
        const selectedFilm = getFilmObject(filmId);
        if (element.id === 'addTOwachedJS') {
            toggleFilmsChapter(WATCHED_KEY_IN_LS, selectedFilm);
            chapter = 'watched';
        }
        if (element.id === 'addTOqueueJS') {
            toggleFilmsChapter(QUEUE_KEY_IN_LS, selectedFilm);
            chapter = 'queue';
        }
        if (event.currentTarget.dataset.page === 'library') {
            removeElementFromMarkup(element, chapter);
        }
        monitorButtonStatusText();
    }
}

function monitorButtonStatusText() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    let isWatched;
    let isInQueue;
    filmArr.forEach(film => {
        const filmId = film.id;
        if (watchedFilms.length > 0) {
            isWatched = checkIsInList(watchedFilms, filmId);
        }
        if (queueFilms.length > 0) {
            isInQueue = checkIsInList(queueFilms, filmId);
        }
        const cardContainerRef = getCurrentParentElement(filmId);
        const watchedBtn = cardContainerRef.querySelector('#addTOwachedJS');
        const queueBtn = cardContainerRef.querySelector('#addTOqueueJS');
        toggleButtons(isWatched, isInQueue, watchedBtn, queueBtn);
    });
}

function getCurrentParentElement(id) {
    const element = allCardsLinks.find(
        card => card.dataset.path === `film/${id}`,
    );
    return element;
}

function getFilmObject(filmId) {
    return filmArr.find(film => film.id == filmId);
}
