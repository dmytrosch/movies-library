import localStorage from './localStorage';

const { setToLS, getFromLS } = localStorage;
const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';

let isWatched;
let isInQueue;
let allCardsLinks;

export default function addBtnsListeners(filmArr) {
    allCardsLinks = document.querySelectorAll('.films-library__gallery-item-wrap')
    allCardsLinks = Array.from(allCardsLinks)
    monitorButtonStatusText(filmArr);
}

function checkIsInList(list, film) {
    return list.some(item => {
        return item.id === film.id;
    });
}

// Обрабатываем состояние кнопок после рендера

//Следит за состоянием LocalStorage и меняет текст кнопок
function monitorButtonStatusText(filmArr) {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    filmArr.forEach(film => {
        isWatched = checkIsInList(watchedFilms, film);
        isInQueue = checkIsInList(queueFilms, film);
        const cardContainerRef = getCurrentParentElement(film.id);
        const watchedBtn = cardContainerRef.querySelector('#addTOwachedJS');
        const queueBtn = cardContainerRef.querySelector('#addTOqueueJS');
        watchedBtn.addEventListener('click', toggleToWatched);
        queueBtn.addEventListener('click', toggleToQueue);
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
    console.log(allCardsLinks);
    const element = allCardsLinks.find(
        card => card.dataset.path === `film/${id}`
    );
    if (element) {
        return element;
    }
}

// Добавляем или удаляем фильм из списка "Очереди"
function toggleToQueue() {
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const isInQueue = checkIsInList(queueFilms);

    if (isInQueue) {
        deleteFromList(queueFilms, QUEUE_KEY_IN_LS);
    } else {
        // Если фильма не было в очереди просмотра, то добавляем в очереди просмотра и удаляем из просмотренных
        addToList(queueFilms, QUEUE_KEY_IN_LS);
        deleteFromList(watchedFilms, WATCHED_KEY_IN_LS);
    }

    monitorButtonStatusText();
}

// Добавляем или удаляем фильм из списка "просмотренных" фильмов.
function toggleToWatched() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const isWatched = checkIsInList(watchedFilms);
    if (isWatched) {
        // Если фильм был в списке просмотренных удаляем его оттуда
        deleteFromList(watchedFilms, WATCHED_KEY_IN_LS);
    } else {
        // Если фильма не было в просмотренных, то добавляем в просмотренные и удаляем из очереди просмотра
        addToList(watchedFilms, WATCHED_KEY_IN_LS);
        deleteFromList(queueFilms, QUEUE_KEY_IN_LS);
    }

    monitorButtonStatusText();
}

// Удаляет фильм из списка, если он там был
function deleteFromList(list, key) {
    if (checkIsInList(list)) {
        setToLS(
            key,
            list.filter(item => item.id !== selectedFilm.id),
        );
    }
}

// Добавляем фильм в список
function addToList(list, key) {
    setToLS(key, list.concat([selectedFilm]));
}
