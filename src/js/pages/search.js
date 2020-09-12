import fetch from '../Api/fetchMethods';
import globalVars from '../components/globalVars.js';
import pagination from '../components/pagination';

const refs = {
    inputForm: document.querySelector('#search-form'),
    prevBtn: document.querySelector('button[data-action="decrement"]'),
    nextBtn: document.querySelector('button[data-action="increment"]'),
    span: document.querySelector('.page-number'),
};
let fetchResult;

refs.inputForm.addEventListener('submit', searchFormHandler);
refs.prevBtn.addEventListener('click', paginationPrevBtnHandler);
refs.nextBtn.addEventListener('click', paginationNextBtnHandler);

disableBtn(refs.prevBtn);

async function searchFormHandler(event) {
    event.preventDefault();
    globalVars.searchQuery = event.target.elements.query.value;
    if (globalVars.searchQuery) {
        pagination.resetPage();
        fetchResult = await fetch.movieSearch(globalVars.searchQuery);
    }

    if (fetchResult.length === 0) {
        // pnotify / alert
    } else {
        //render списка
    }
    console.log(fetchResult);
    console.log(globalVars.pageNumber, 'before func');
    await checkNextPageResult();
    console.log(globalVars.pageNumber, 'after func');

    refs.span.textContent = globalVars.pageNumber;
}

async function paginationPrevBtnHandler() {
    pagination.decrementPage();
    refs.span.textContent = globalVars.pageNumber;

    fetchResult = await fetch.movieSearch(globalVars.searchQuery);

    console.log(fetchResult);

    if (globalVars.pageNumber === 1) {
        disableBtn(refs.prevBtn);
    }
}

async function paginationNextBtnHandler() {
    pagination.incrementPage();
    refs.prevBtn.disabled = false;

    fetchResult = await fetch.movieSearch(globalVars.searchQuery);
    await checkNextPageResult();
    console.log(fetchResult);

    refs.span.textContent = globalVars.pageNumber;
}

async function checkNextPageResult() {
    globalVars.pageNumber++;
    const nextFetchResult = await fetch.movieSearch(globalVars.searchQuery);
    globalVars.pageNumber--;
    console.log('func', globalVars.pageNumber, nextFetchResult);
    if (nextFetchResult.length === 0) {
        disableBtn(refs.nextBtn);
    }
}

function disableBtn(elementBtn) {
    elementBtn.disabled = true;
}
