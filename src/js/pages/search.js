import fetch from '../Api/fetchMethods';
import { pageNumber } from '../components/globalVars.js';
import globalVars from '../components/globalVars.js'

const refs = {
    inputForm: document.querySelector('#search-form'),
    prevBtn: document.querySelector('button[data-action="decrement"]'),
    nextBtn: document.querySelector('button[data-action="increment"]'),
    span : document.querySelector('.page-number'),
};

refs.inputForm.addEventListener('submit', searchFormHandler);
refs.prevBtn.addEventListener('click', paginationPrevBtnHandler)
refs.nextBtn.addEventListener('click', paginationNextBtnHandler)

refs.prevBtn.disabled = true;

async function searchFormHandler(event) {
    event.preventDefault();
    globalVars.searchQuery = event.target.elements.query.value;
    let fetchResult;

    if (globalVars.searchQuery) {
        globalVars.resetPage()
        fetchResult = await fetch.movieSearch(globalVars.searchQuery);
    }

    if (fetchResult.length === 0) {
        // pnotify / alert
    } else {
        //render списка
    }
    console.log(fetchResult);
    console.log(pageNumber);

    refs.span.textContent = pageNumber;
}

async function paginationPrevBtnHandler(){
    globalVars.decrementPage()
    refs.span.textContent = pageNumber;

    const data = await fetch.movieSearch(globalVars.searchQuery);

    console.log(data)

    if (pageNumber === 1){
        refs.prevBtn.disabled = true;
    }
}

async function paginationNextBtnHandler(){
    globalVars.incrementPage()
    refs.prevBtn.disabled = false;

    const data = await fetch.movieSearch(globalVars.searchQuery);

    console.log(data)

    refs.span.textContent = pageNumber;
}
