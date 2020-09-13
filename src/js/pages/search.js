import fetch from '../Api/fetchMethods';
import globalVars from '../components/globalVars.js';
import pagination from '../components/pagination';
import renderMarkUp from '../components/renderMarkUp';

const refs = {
    prevBtn: null,
    nextBtn: null,
    span: null,
};
let fetchResult;

export default function addSearchListener() {
    const inputFormRef = document.querySelector('#search-form');
    inputFormRef.addEventListener('submit', searchFormHandler);
}
function addPaginationBtnsListeners() {
    refs.prevBtn.addEventListener('click', paginationPrevBtnHandler);
    refs.nextBtn.addEventListener('click', paginationNextBtnHandler);
}

function addPaginationBtns() {
    refs.prevBtn = document.querySelector('button[data-action="decrement"]');
    refs.nextBtn = document.querySelector('button[data-action="increment"]');
    refs.span = document.querySelector('.page-number');
}

async function searchFormHandler(event) {
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
        renderMarkUp.searchSuccessResultPage(fetchResult);
        addPaginationBtns();
        disableBtn(refs.prevBtn);
        addPaginationBtnsListeners();
        await checkNextPageResult();
        refs.span.textContent = globalVars.pageNumber;
    }
}

async function paginationPrevBtnHandler() {
    pagination.decrementPage();
    refs.span.textContent = globalVars.pageNumber;
    fetchResult = await fetch.movieSearch(globalVars.searchQuery);
    renderMarkUp.searchSuccessResultPage(fetchResult);
    if (globalVars.pageNumber === 1) {
        disableBtn(refs.prevBtn);
    }
}

async function paginationNextBtnHandler() {
    pagination.incrementPage();
    refs.prevBtn.disabled = false;

    fetchResult = await fetch.movieSearch(globalVars.searchQuery);
    await checkNextPageResult();
    renderMarkUp.searchSuccessResultPage(fetchResult);
    refs.span.textContent = globalVars.pageNumber;
}

async function checkNextPageResult() {
    globalVars.pageNumber++;
    const nextFetchResult = await fetch.movieSearch(globalVars.searchQuery);
    globalVars.pageNumber--;
    if (nextFetchResult.length === 0) {
        disableBtn(refs.nextBtn);
    }
}

function disableBtn(elementBtn) {
    elementBtn.disabled = true;
}
