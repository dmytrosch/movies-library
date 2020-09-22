import fetch from '../Api/fetchMethods';
import globalVars from '../components/globalVars.js';
import pagination from '../components/pagination';
import renderMarkUp from '../components/renderMarkUp';
import navigateToFilmPage from '../components/navigateToFilmPage';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    prevBtn: null,
    nextBtn: null,
    span: null,
};
let fetchResult;

export async function search() {
    pagination.resetPage();
    try {
        fetchResult = await fetch.movieSearch();
    } catch (err){
        throw err;
    }
    const { results, page, total_pages, total_results } = fetchResult;

    if (total_results === 0 || results.length === 0) {
        renderMarkUp.pageEmptySearchResponseQuery();
        return;
    }

    if (total_results === 1 || results.length === 1) {
        navigateToFilmPage.navigateToFilmPage(`film/${fetchResult[0].id}`);
        return;
    }
    renderMarkUp.searchSuccessResultPage(results);
    navigateToFilmPage.addFilmCardClickListeners();
    addPaginationBtns();
    addRemoveLibraryChapters(results);
    if (page === 1) {
        disableBtn(refs.prevBtn);
    }
    if (page === total_pages) {
        disableBtn(refs.nextBtn);
    }
    addPaginationBtnsListeners();
    refs.span.textContent = page;
    globalVars.pageNumber = page;
    addSearchListener();
}

export function addSearchListener() {
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

function searchFormHandler(event) {
    event.preventDefault();
    const query = event.target.elements.query.value;
    if (query) {
        window['router'].navigate(`search/${query}`);
    } else {
        error({
            text: 'Empty search query. Please, enter your require!',
            delay: '4000',
        });
        return;
    }
}

async function paginationPrevBtnHandler() {
    pagination.decrementPage();
    paginationResult();
}

function paginationNextBtnHandler() {
    pagination.incrementPage();
    paginationResult()
}

async function paginationResult(){
    try {
        fetchResult = await fetch.movieSearch(globalVars.searchQuery);
    } catch {
        throw error;
    }
    const { results, page, total_pages } = fetchResult;
    renderMarkUp.searchSuccessResultPage(results);
    navigateToFilmPage.addFilmCardClickListeners();
    if (page === 1) {
        disableBtn(refs.prevBtn);
    }
    if (page === total_pages) {
        disableBtn(refs.nextBtn);
    }
    if (page < total_pages) {
        refs.nextBtn.disabled = false;
    }
    if (page > 1) {
        refs.prevBtn.disabled = false;
    }
    globalVars.pageNumber = page;
    refs.span.textContent = page;

}

function disableBtn(elementBtn) {
    elementBtn.disabled = true;
}
