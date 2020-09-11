import fetch from '../Api/fetchMethods';
import { pageNumber } from '../components/globalVars.js';
import pagination from '../components/pagePagination.js';

const refs = {
    inputForm: document.querySelector('#search-form'),
    prevBtn: document.querySelector('button[data-action="decrement"]'),
    nextBtn: document.querySelector('button[data-action="increment"]'),
    span : document.querySelector('.page-number'),
};

refs.inputForm.addEventListener('submit', searchFormHandler);
refs.prevBtn.addEventListener('click', paginationPrevBtnHandler)
refs.nextBtn.addEventListener('click', paginationNextBtnHandler)

async function searchFormHandler(event) {
    event.preventDefault();
    const searchValue = event.target.elements.query.value;
    
    let fetchResult;
    if (searchValue) {
        pagination.resetPage()
        fetchResult = await fetch.movieSearch(searchValue);
    }
    if(fetchResult.length === 0){
        // pnotify / alert
    }else{
        //render списка
    }
    console.log(fetchResult);
    console.log(pageNumber);
    
}
refs.prevBtn.setAttribute('disabled', 'disabled') ;

function paginationPrevBtnHandler(){
     pagination.decrementPage()         
}

function paginationNextBtnHandler(){
    pagination.incrementPage()
    fetch.movieSearch()
    console.log(pageNumber);
    refs.span.textContent = pageNumber;
    console.log(fetch.movieSearch());
}