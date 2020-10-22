import renderMarkUp from '../components/renderMarkUp';

import { getMovieById, getMovieTrailer } from '../Api/fetchMethods';
import { globalState } from '../constants';
import toggleButtons from '../utils/toggleButtons';
import toggleFilmsChapter from '../utils/toggleFilmsChapters';
import {
    getFromLS,
    checkIsInList,
    deleteFromList,
    addToList,
} from '../utils/chaptersInLS';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import spinner from '../components/spinner';
import * as basicLightBox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let selectedFilm;
let instance;
const refs = {
    watchedBtn: null,
    queueBtn: null,
};

const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalState;

export default async function filmPage(id) {
    selectedFilm = await getMovieById(id);
    if (selectedFilm.status_code === 34) {
        renderMarkUp.page404();
        return;
    }
    if (selectedFilm.status_code === 7) {
        renderMarkUp.pageError();
        return;
    }
    renderMarkUp.filmPage(selectedFilm);
    const link = document.querySelector('#js-poster-link');
    link.addEventListener('click', handleFilmPosterClick);
    refs.watchedBtn = document.getElementById('addTOwachedJS');
    refs.queueBtn = document.getElementById('addTOqueueJS');
    refs.watchedBtn.addEventListener('click', watchedBtnHandler);
    refs.queueBtn.addEventListener('click', queueBtnHandler);
    monitorButtonStatusText();
}

function monitorButtonStatusText() {
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const isWatched = checkIsInList(watchedFilms, selectedFilm.id);
    const isInQueue = checkIsInList(queueFilms, selectedFilm.id);
    toggleButtons(isWatched, isInQueue, refs.watchedBtn, refs.queueBtn);
}

function queueBtnHandler() {
    toggleFilmsChapter(QUEUE_KEY_IN_LS, selectedFilm);
    monitorButtonStatusText();
}

function watchedBtnHandler() {
    toggleFilmsChapter(WATCHED_KEY_IN_LS, selectedFilm);
    monitorButtonStatusText();
}

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
    const markup = renderMarkUp.filmTrailerOverlay(videoKey);
    instance = basicLightBox.create(markup, {
        closable: true,
        onShow() {
            spinner.hide();
            window.addEventListener('keydown', onEscPressHandler);
        },
        onClose() {
            window.removeEventListener('keydown', onEscPressHandler);
        },
    });
}

function onEscPressHandler(event) {
    if (event.code === 'Escape') {
        instance.close();
    }
}
