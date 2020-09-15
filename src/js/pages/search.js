import fetch from '../Api/fetchMethods';
import globalVars from '../components/globalVars.js';
import pagination from '../components/pagination';
import renderMarkUp from '../components/renderMarkUp';
import navigateToFilmPage from '../components/navigateToFilmPage';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';

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

async function paginationPrevBtnHandler() {
    pagination.decrementPage();
    if (globalVars.pageNumber > 0) {
        try{
           fetchResult = await fetch.movieSearch(globalVars.searchQuery); 
        }catch{
            throw error;
        }
        const { results, page, total_pages } = fetchResult;
        renderMarkUp.searchSuccessResultPage(results);
        navigateToFilmPage.addFilmCardClickListeners();
        if (page === 1) {
            disableBtn(refs.prevBtn);
        }
        refs.span.textContent = page;
        globalVars.pageNumber = page;
        if (page < total_pages) {
            refs.nextBtn.disabled = false;
        }
    }
    refs.span.textContent = globalVars.pageNumber;
}

async function paginationNextBtnHandler() {
    pagination.incrementPage();
    if (globalVars.pageNumber > 1) {
        refs.prevBtn.disabled = false;
    }
    try{
        fetchResult = await fetch.movieSearch(globalVars.searchQuery); 
     }catch{
         throw error;
     }
    const { results, page, total_pages } = fetchResult;
    renderMarkUp.searchSuccessResultPage(results);
    navigateToFilmPage.addFilmCardClickListeners();
    refs.span.textContent = page;
    globalVars.pageNumber = page;
    if (page === total_pages) {
        disableBtn(refs.nextBtn);
    }
}

function disableBtn(elementBtn) {
    elementBtn.disabled = true;
}
