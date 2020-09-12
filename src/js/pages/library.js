import renderMarkUp from '../components/renderMarkUp.js';
export default function library(){
    const data = getQueueFilmsFromLS();
    renderMarkUp.libraryPage(data);
    console.log(data);
}


function getFromLS(key) {
    console.log(key);
    return JSON.parse(localStorage.getItem(key)) || [];
}

function getWachedFilmsFromLS() {
    const data = getFromLS("watchedFilms");
    return data;
}

function getQueueFilmsFromLS() {
    const data = getFromLS("addedToQueue");
    return data;
}