export let selectFilm;
export let pageNumber = 1;
export let filmListResult;
// export let searchQuery = '';

export default {
    incrementPage() {
        pageNumber ++;
    },
    decrementPage() {
        pageNumber --;
    },
    resetPage() {
        pageNumber = 1;
    },
    searchQuery : '',
 }


