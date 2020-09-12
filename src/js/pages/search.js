import fetch from '../Api/fetchMethods';
import globalVars from '../components/globalVars.js';
import pagination from '../components/pagination';
import renderMarkUp from '../components/renderMarkUp';

const refs = {
    prevBtn: document.querySelector('button[data-action="decrement"]'),
    nextBtn: document.querySelector('button[data-action="increment"]'),
    span: document.querySelector('.page-number'),
};

export default function addSearchListener() {
    const inputFormRef = document.querySelector('#search-form');
    inputFormRef.addEventListener('submit', searchFormHandler);
}
function addPaginationBtnsListeners() {
    refs.prevBtn.addEventListener('click', paginationPrevBtnHandler);
    refs.nextBtn.addEventListener('click', paginationNextBtnHandler);
}

let fetchResult;

async function searchFormHandler(event) {
    console.log('handler');
    event.preventDefault();
    globalVars.searchQuery = event.target.elements.query.value;
    if (globalVars.searchQuery) {
        pagination.resetPage();
        try {
            fetchResult = await fetch.movieSearch();
        } catch {
            throw error;
        }
    }

    if (fetchResult.length === 0) {
        // pnotify / alert
        renderMarkUp.pageEmptySearchResponseQuery();
    } else {
        //render списка
        addPaginationBtnsListeners();
        disableBtn(refs.prevBtn);
        await checkNextPageResult();
        refs.span.textContent = globalVars.pageNumber;
    }
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
        console.log('qwe');

        disableBtn(refs.nextBtn);
    }
}

function disableBtn(elementBtn) {
    elementBtn.disabled = true;
}
