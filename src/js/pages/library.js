import renderMarkUp from '../components/renderMarkUp.js';
import localStorage from '../components/localStorage';

export default function library(){
    const data = getQueueFilmsFromLS();
    renderMarkUp.libraryPage(data);
    console.log(data);
}

function getWachedFilmsFromLS() {
    const data = localStorage.getFromLS("filmsWatched");
    return data;
}

function getQueueFilmsFromLS() {
    const data = localStorage.getFromLS("filmsQueue");
    return data;
}