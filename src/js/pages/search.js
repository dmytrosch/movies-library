import fetch from '../Api/fetchMethods';
import globalVars from '../components/globalVars.js';
import pagination from '../components/pagination';
import epmtyRequest from '../../templates/emptyRequestTemplate.hbs';

const refs = {
    inputForm: document.querySelector('#search-form'),
    prevBtn: document.querySelector('button[data-action="decrement"]'),
    nextBtn: document.querySelector('button[data-action="increment"]'),
    span: document.querySelector('.page-number'),
    list: document.querySelector('.films-library__gallery'),
};
let fetchResult;

refs.inputForm.addEventListener('submit', searchFormHandler);
refs.prevBtn.addEventListener('click', paginationPrevBtnHandler);
refs.nextBtn.addEventListener('click', paginationNextBtnHandler);

disableBtn(refs.prevBtn);

async function searchFormHandler(event) {
    try {
        event.preventDefault();
        globalVars.searchQuery = event.target.elements.query.value;
        if (globalVars.searchQuery) {
            pagination.resetPage();
            fetchResult = await fetch.movieSearch(globalVars.searchQuery);
        }

        if (fetchResult.length === 0) {
            // pnotify / alert
            const markup = epmtyRequest(globalVars.searchQuery);
            refs.list.insertAdjacentHTML('beforeend', markup);
        } else {
            //render списка
        }
        console.log(fetchResult);
        console.log(globalVars.pageNumber, 'before func');
        await checkNextPageResult();
        console.log(globalVars.pageNumber, 'after func');

        refs.span.textContent = globalVars.pageNumber;
    } catch (error) {
        throw error;
    }
}

async function paginationPrevBtnHandler() {
    try {
        pagination.decrementPage();
        refs.span.textContent = globalVars.pageNumber;

        fetchResult = await fetch.movieSearch(globalVars.searchQuery);

        console.log(fetchResult);

        if (globalVars.pageNumber === 1) {
            disableBtn(refs.prevBtn);
        }
    } catch (error) {
        throw error;
    }
}

async function paginationNextBtnHandler() {
    try {
        pagination.incrementPage();
        refs.prevBtn.disabled = false;

        fetchResult = await fetch.movieSearch(globalVars.searchQuery);
        await checkNextPageResult();
        console.log(fetchResult);

        refs.span.textContent = globalVars.pageNumber;
    } catch (error) {
        throw error;
    }
}

async function checkNextPageResult() {
    try {
        globalVars.pageNumber++;
        const nextFetchResult = await fetch.movieSearch(globalVars.searchQuery);
        globalVars.pageNumber--;
        console.log('func', globalVars.pageNumber, nextFetchResult);
        if (nextFetchResult.length === 0) {
            disableBtn(refs.nextBtn);
        }
    } catch (error) {
        throw error;
    }
}

function disableBtn(elementBtn) {
    console.log('dis');
    elementBtn.disabled = true;
}

async function showPopularMovies() {
    try {
        const popularMoviesResult = await fetch.popularSearch();
        console.log('showPopularMovies', popularMoviesResult.results);
    } catch (error) {
        throw error;
    }
}
