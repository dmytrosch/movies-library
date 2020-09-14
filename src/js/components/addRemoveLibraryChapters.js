import localStorage from './localStorage';

const { setToLS, getFromLS } = localStorage;
const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';
const refs = {
    watchedBtn: null,
    queueBtn: null,
};

export default async function addBtnsListeners() {
        refs.watchedBtn = document.getElementById('addTOwachedJS');
        refs.queueBtn = document.getElementById('addTOqueueJS');
        refs.watchedBtn.addEventListener('click', toggleToWatched);
        refs.queueBtn.addEventListener('click', toggleToQueue);
        monitorButtonStatusText();
    }

const checkIsInList = list => list.find(item => item.id === selectedFilm.id);

// Обрабатываем состояние кнопок после рендера

//Следит за состоянием LocalStorage и меняет текст кнопок
function monitorButtonStatusText() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const isWatched = checkIsInList(watchedFilms);
    const isInQueue = checkIsInList(queueFilms);
    if (isWatched) {
        refs.watchedBtn.innerHTML = 'Delete from watched';
        refs.watchedBtn.dataset.action = 'delete';
        refs.queueBtn.innerHTML = 'Watch again';
        refs.queueBtn.dataset.action = 'add';
    }
    if (isInQueue) {
        refs.watchedBtn.innerHTML = 'Add to watched';
        refs.watchedBtn.dataset.action = 'add';
        refs.queueBtn.innerHTML = 'Delete from queue';
        refs.queueBtn.dataset.action = 'delete';
    }
    if (!isWatched && !isInQueue) {
        refs.queueBtn.innerHTML = 'Add to queue';
        refs.queueBtn.dataset.action = 'add';
        refs.watchedBtn.innerHTML = 'Add to watched';
        refs.watchedBtn.dataset.action = 'add';
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
