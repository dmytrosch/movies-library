import renderMarkUp from '../components/renderMarkUp.js';
import localStorage from '../components/localStorage';

const QUEUE_KEY_IN_LS = 'filmsQueue';
const WATCHED_KEY_IN_LS = 'filmsWatched';

export default function library(){
    const data = getQueueFilmsFromLS();
    renderMarkUp.libraryPage(data);
    console.log(data);
}

function getWachedFilmsFromLS() {
    const data = localStorage.getFromLS(WATCHED_KEY_IN_LS);
    return data;
}

function getQueueFilmsFromLS() {
    const data = localStorage.getFromLS(QUEUE_KEY_IN_LS);
    return data;
}