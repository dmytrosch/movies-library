import fetch from '../Api/fetchMethods';

// const refs = {
//     inputForm: document.querySelector('#search-form'),
// };

// refs.inputForm.addEventListener('submit', searchFormHandler);

async function searchFormHandler(event) {
    event.preventDefault();
    const searchValue = event.target.elements.query.value;
    let fetchResult;
    if (searchValue) {
        fetchResult = await fetch.movieSearch(searchValue);
    }
    console.log(fetchResult);
}
