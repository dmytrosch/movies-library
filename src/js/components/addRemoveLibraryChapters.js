import localStorageObj from './localStorage';
import globalVars from './globalVars';
import renderMarkUp from './renderMarkUp';
import { success } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

let allCardsLinks;
let filmId;
let filmArr;
let chapter;

const { getFromLS, addToList, deleteFromList, checkIsInList } = localStorageObj;
const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalVars;

export default function addBtnsListeners(filmsOnPage) {
    filmArr = filmsOnPage;
    allCardsLinks = document.querySelectorAll(
        '.films-library__gallery-item-wrap',
    );
    allCardsLinks = Array.from(allCardsLinks);
    const containerRef = document.querySelector('.films-library__gallery');
    containerRef.addEventListener('click', onButtonClickHandler);
    monitorButtonStatusText();
}
function onButtonClickHandler(event) {
    event.preventDefault();
    const element = event.target;
    if (element.nodeName === 'BUTTON') {
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
            removeElement(element);
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

function getFilmObject() {
    const film = filmArr.find(film => film.id == filmId);
    return film;
}

function removeElement(childElement) {
    const cardToRemove = childElement.closest('li.films-library__gallery-item');
    const cardList = cardToRemove.parentNode;
    const containersChildrens = Array.from(cardList.children);
    const index = containersChildrens.indexOf(cardToRemove);
    if (index === 0 || index % 2 === 0) {
        cardToRemove.classList.add('films-library__gallery-item--remove_left');
    } else {
        cardToRemove.classList.add('films-library__gallery-item--remove_right');
    }
    setTimeout(() => {
        cardToRemove.remove();
    }, 800);
    if (cardList.children.length === 1) {
        renderMarkUp.noAddedYetPage(chapter);
    }
}
