import localStorageObj from './localStorage';
import {globalState} from '../constants';
import { removeElementFromMarkup } from '../pages/library';
import { success } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

let allCardsLinks;
let filmId;
let filmArr;

const { getFromLS, addToList, deleteFromList, checkIsInList } = localStorageObj;
const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalState;

export default function addBtnsListeners(filmsOnPage) {
    if (window.innerWidth < 1024) {
        return;
    }
    filmArr = filmsOnPage;
    allCardsLinks = document.querySelectorAll(
        '.film-list__item-overlay'
    );
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

        filmId = element.dataset.filmid;
        if (element.id === 'addTOwachedJS') {
            toggleToWatched();
            chapter = 'watched';
        }
        if (element.id === 'addTOqueueJS') {
            toggleToQueue();
            chapter = 'queue';
        }
        if (event.currentTarget.dataset.page === 'library') {
            removeElementFromMarkup(element, chapter);
        }
    }
}

//Следит за состоянием LocalStorage и меняет текст кнопок
function monitorButtonStatusText() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    let isWatched;
    let isInQueue;
    filmArr.forEach(film => {
        filmId = film.id;
        if (watchedFilms.length > 0) {
            isWatched = checkIsInList(watchedFilms, filmId);
        }
        if (queueFilms.length > 0) {
            isInQueue = checkIsInList(queueFilms, filmId);
        }
        const cardContainerRef = getCurrentParentElement(filmId);
        const watchedBtn = cardContainerRef.querySelector('#addTOwachedJS');
        const queueBtn = cardContainerRef.querySelector('#addTOqueueJS');

        // Вот такой же код я видел в ./src/pages/filmPage.js
        // Может стоит вынести это в отдельую функцию, и передавать ей нужные елементы как параметры при вызове
        if (isWatched) {
            watchedBtn.innerHTML = 'Delete from watched';
            watchedBtn.dataset.action = 'delete';
            queueBtn.innerHTML = 'Watch again';
            queueBtn.dataset.action = 'add';
        }
        if (isInQueue) {
            watchedBtn.innerHTML = 'Add to watched';
            watchedBtn.dataset.action = 'add';
            queueBtn.innerHTML = 'Delete from queue';
            queueBtn.dataset.action = 'delete';
        }
        if (!isWatched && !isInQueue) {
            queueBtn.innerHTML = 'Add to queue';
            queueBtn.dataset.action = 'add';
            watchedBtn.innerHTML = 'Add to watched';
            watchedBtn.dataset.action = 'add';
        }
    });
}

function getCurrentParentElement(id) {
    const element = allCardsLinks.find(
        card => card.dataset.path === `film/${id}`,
    );
    // В этом if Нет никакого смысла вообще
    // Если element есть - мы его возвращаем, если нет - возвращаем undefined
    // Поэтому просто return element; делает то же самое
    if (element) {
        return element;
    }
}

// Добавляем или удаляем фильм из списка "Очереди"
function toggleToQueue() {
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const isInQueue = checkIsInList(queueFilms, filmId);

    if (isInQueue) {
        deleteFromList.call(
            localStorageObj,
            queueFilms,
            filmId,
            QUEUE_KEY_IN_LS,
        );
        success({ text: 'Movie deleted from queue', delay: '2000' });
    } else {
        // Если фильма не было в очереди просмотра, то добавляем в очереди просмотра и удаляем из просмотренных
        addToList.call(
            localStorageObj,
            queueFilms,
            QUEUE_KEY_IN_LS,
            getFilmObject(),
        );
        deleteFromList.call(
            localStorageObj,
            watchedFilms,
            filmId,
            WATCHED_KEY_IN_LS,
        );
        success({ text: 'Movie added to queue', delay: '2000' });
    }

    monitorButtonStatusText();
}

// Добавляем или удаляем фильм из списка "просмотренных" фильмов.
function toggleToWatched() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    let isWatched;
    if (watchedFilms.length > 0) {
        isWatched = checkIsInList(watchedFilms, filmId);
    }
    if (isWatched) {
        // Если фильм был в списке просмотренных удаляем его оттуда
        deleteFromList.call(
            localStorageObj,
            watchedFilms,
            filmId,
            WATCHED_KEY_IN_LS,
        );
        success({ text: 'Movie deleted from watched', delay: '2000' });
    } else {
        // Если фильма не было в просмотренных, то добавляем в просмотренные и удаляем из очереди просмотра
        addToList.call(
            localStorageObj,
            watchedFilms,
            WATCHED_KEY_IN_LS,
            getFilmObject(),
        );
        deleteFromList.call(
            localStorageObj,
            queueFilms,
            filmId,
            QUEUE_KEY_IN_LS,
        );
        success({ text: 'Movie added to watched', delay: '2000' });
    }

    monitorButtonStatusText();
}

/*
  Функции toggleToQueue и toggleToWatched почти одинаковы, а так же они есть в файле ./src/pages/filmPage.js
  Чтобы не дублировать код в 4х местах выносим это в одну функцию, и параметризаруем ее во время вызова
 */

function getFilmObject() {
    return filmArr.find(film => film.id == filmId);
}
