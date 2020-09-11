import { pageNumber } from '../components/globalVars.js';

const baseUrl = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=0c84539b7b6fe9bdba856aa5f27d88e0';

export default {
    movieSearch(query) {
        const pageCount = `&page=${pageNumber}`;
        const movieSearch = '/search/movie';
        const searchQueryString = `&query=${query}`;
        const per_page = '&per_page=6';
        return fetch(baseUrl + movieSearch + API_KEY + searchQueryString + pageCount)
            .then(response => response.json())
            .then(parcedData => {
                // this.incrementPage();
                return parcedData.results;
            });
    },
    get searchQuery() {
        return this.query;
    },
    set searchQuery(string) {
        this.query = string;
    },
    incrementPage() {
        pageNumber += 1;
    },
    decrementPage() {
        pageNumber--;
    },
    idSearch(id) {
        const idSearch = `/movie/${id}`;
        return fetch(baseUrl + idSearch + API_KEY)
            .then(response => response.json())
            .then(parcedMovieById => {
                // this.incrementPage();
                return parcedMovieById;
            });
    },
};
