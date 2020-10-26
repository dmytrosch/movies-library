import { globalState } from '../constants';
import {
    getFromLS,
    checkIsInList,
    deleteFromList,
    addToList,
} from './chaptersInLS';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { success } from '@pnotify/core/dist/PNotify.js';

const { QUEUE_KEY_IN_LS, WATCHED_KEY_IN_LS } = globalState;

export default function toggleFilmsChapter(chapter, selectedFilm) {
    const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
    const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
    console.log(chapter);
    if (chapter === QUEUE_KEY_IN_LS) {
        const isInQueue = checkIsInList(queueFilms, selectedFilm.id);
        if (isInQueue) {
            deleteFromList(queueFilms, selectedFilm.id, QUEUE_KEY_IN_LS);
            success({ text: 'Movie deleted from queue', delay: '2000' });
        } else {
            addToList(queueFilms, QUEUE_KEY_IN_LS, selectedFilm);
            deleteFromList(watchedFilms, selectedFilm.id, WATCHED_KEY_IN_LS);
            success({ text: 'Movie added to queue', delay: '2000' });
        }
    }
    if (chapter === WATCHED_KEY_IN_LS) {
        const isWatched = checkIsInList(watchedFilms, selectedFilm.id);
        console.log(isWatched);
        if (isWatched) {
            deleteFromList(watchedFilms, selectedFilm.id, WATCHED_KEY_IN_LS);
            success({ text: 'Movie deleted from watched', delay: '2000' });
        } else {
            addToList(watchedFilms, WATCHED_KEY_IN_LS, selectedFilm);
            deleteFromList(queueFilms, selectedFilm.id, QUEUE_KEY_IN_LS);
            success({ text: 'Movie added to watched', delay: '2000' });
        }
    }
}
