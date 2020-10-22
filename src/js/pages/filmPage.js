import renderMarkUp from '../components/renderMarkUp';
import localStorageObj from '../components/localStorage';
import * as basicLightBox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import spinner from '../components/spinner';
import { getMovieById, getMovieTrailer } from '../Api/fetchMethods';
import { globalState } from '../constants';
import { success } from '@pnotify/core/dist/PNotify.js';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const { getFromLS, addToList, deleteFromList, checkIsInList } = localStorageObj;
const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalState;
let selectedFilm;
let instance;
const refs = {
    watchedBtn: null,
    queueBtn: null,
};

export default async function filmPage(id) {
    selectedFilm = await getMovieById(id);
    if (selectedFilm.status_code === 34) {
        renderMarkUp.page404();
        return;
    }
    if (selectedFilm.status_code === 7) {
        renderMarkUp.pageError();
        // В этом return нет никакого смысла
        return;
    } else {
        renderMarkUp.filmPage(selectedFilm);
        const link = document.querySelector('#js-poster-link');
        link.addEventListener('click', handleFilmPosterClick);
        refs.watchedBtn = document.getElementById('addTOwachedJS');
        refs.queueBtn = document.getElementById('addTOqueueJS');
        refs.watchedBtn.addEventListener('click', toggleToWatched);
        refs.queueBtn.addEventListener('click', toggleToQueue);
        monitorButtonStatusText();
    }
}

// Обрабатываем состояние кнопок после рендера

//Следит за состоянием LocalStorage и меняет текст кнопок
function monitorButtonStatusText() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const isWatched = checkIsInList(watchedFilms, selectedFilm.id);
    const isInQueue = checkIsInList(queueFilms, selectedFilm.id);
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

function toggleToQueue() {
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const isInQueue = checkIsInList(queueFilms, selectedFilm.id);
    if (isInQueue) {
        deleteFromList.call(
            localStorageObj,
            queueFilms,
            selectedFilm.id,
            QUEUE_KEY_IN_LS,
        );
        success({ text: 'Movie deleted from queue', delay: '2000' });
    } else {
        // Если фильма не было в очереди просмотра, то добавляем в очереди просмотра и удаляем из просмотренных
        addToList.call(
            localStorageObj,
            queueFilms,
            QUEUE_KEY_IN_LS,
            selectedFilm,
        );
        deleteFromList.call(
            localStorageObj,
            watchedFilms,
            selectedFilm.id,
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
    const isWatched = checkIsInList(watchedFilms, selectedFilm.id);
    if (isWatched) {
        // Если фильм был в списке просмотренных удаляем его оттуда
        deleteFromList.call(
            localStorageObj,
            watchedFilms,
            selectedFilm.id,
            WATCHED_KEY_IN_LS,
        );
        success({ text: 'Movie deleted from watched', delay: '2000' });
    } else {
        // Если фильма не было в просмотренных, то добавляем в просмотренные и удаляем из очереди просмотра
        addToList.call(
            localStorageObj,
            watchedFilms,
            WATCHED_KEY_IN_LS,
            selectedFilm,
        );
        deleteFromList.call(
            localStorageObj,
            queueFilms,
            selectedFilm.id,
            QUEUE_KEY_IN_LS,
        );
        success({ text: 'Movie added to watched', delay: '2000' });
    }

    monitorButtonStatusText();
}

/*
  Функции toggleToQueue и toggleToWatched почти одинаковы.
  Может стоит создать одну функцию, которая будет получать разные параметры
  Чтобы не дублировать код
 */

async function handleFilmPosterClick() {
    spinner.show();
    let videoKey;
    try {
        videoKey = await getMovieTrailer(selectedFilm.id).then(d => d[0].key);
        createTrailerLightBox(videoKey);
        instance.show();
    } catch {
        spinner.hide();
        error({ text: 'Cannot find trailer of this movie.', delay: '2000' });
    }
}

function createTrailerLightBox(videoKey) {
    // Разметку я бы вынес в отдельную переменную, чтобы функция была более простой в чтении
    instance = basicLightBox.create(
        `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        {
            closable: true,
            onShow() {
                spinner.hide();
                window.addEventListener('keydown', onEscPressHandler);
            },
            onClose() {
                window.removeEventListener('keydown', onEscPressHandler);
            },
        },
    );
}

function onEscPressHandler(event) {
    if (event.code === 'Escape') {
        instance.close();
    }
}
