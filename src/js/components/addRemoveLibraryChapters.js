import localStorage from './localStorage';
import { success } from '@pnotify/core/dist/PNotify.js';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const { setToLS, getFromLS } = localStorage;
const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';

let allCardsLinks;
let filmId;
let filmArr;

export default function addBtnsListeners(filmsOnPage, isMainPage = false) {
    filmArr = filmsOnPage;
    allCardsLinks = document.querySelectorAll(
        '.films-library__gallery-item-wrap',
    );
    allCardsLinks = Array.from(allCardsLinks);
    let containerRef;
    if (isMainPage) {
        containerRef = document.querySelector('.films-library__gallery');
    } else {
        containerRef = document.querySelector('.films-library__gallery-list');
    }
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
        }
        if (element.id === 'addTOqueueJS') {
            toggleToQueue();
        }
    }
}

const checkIsInList = list => list.find(item => item.id == filmId);

// Обрабатываем состояние кнопок после рендера

//Следит за состоянием LocalStorage и меняет текст кнопок
function monitorButtonStatusText() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    let isWatched;
    let isInQueue;
    filmArr.forEach(film => {
        filmId = film.id;
        if (watchedFilms.length > 0) {
            // console.log('check watched', watchedFilms);
            isWatched = checkIsInList(watchedFilms);
        }
        if (queueFilms.length > 0) {
            // console.log('check queue', queueFilms);
            isInQueue = checkIsInList(queueFilms);
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
    let isInQueue;
    if (queueFilms.length > 0) {
        isInQueue = checkIsInList(queueFilms);
    }

    if (isInQueue) {
        deleteFromList(queueFilms, QUEUE_KEY_IN_LS);
        success({ text: 'Movie deleted from queue', delay: '2000' });
    } else {
        // Если фильма не было в очереди просмотра, то добавляем в очереди просмотра и удаляем из просмотренных
        addToList(queueFilms, QUEUE_KEY_IN_LS);
        deleteFromList(watchedFilms, WATCHED_KEY_IN_LS);
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
        isWatched = checkIsInList(watchedFilms);
    }
    if (isWatched) {
        // Если фильм был в списке просмотренных удаляем его оттуда
        deleteFromList(watchedFilms, WATCHED_KEY_IN_LS);
        success({ text: 'Movie deleted from watched', delay: '2000' });
    } else {
        // Если фильма не было в просмотренных, то добавляем в просмотренные и удаляем из очереди просмотра
        addToList(watchedFilms, WATCHED_KEY_IN_LS);
        deleteFromList(queueFilms, QUEUE_KEY_IN_LS);
        success({ text: 'Movie added to watched', delay: '2000' });
    }

    monitorButtonStatusText();
}

// Удаляет фильм из списка, если он там был
function deleteFromList(list, key) {
    setToLS(
        key,
        list.filter(item => item.id != filmId),
    );
}

// Добавляем фильм в список
function addToList(list, key) {
    setToLS(key, list.concat([filmArr.find(film => film.id == filmId)]));
}
