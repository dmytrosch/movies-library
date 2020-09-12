import globalVars from '../components/globalVars';

const baseUrl = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=0c84539b7b6fe9bdba856aa5f27d88e0';
const queryLanguage = '&language=en-US'

export default {
    movieSearch(query) {
        const pageCount = `&page=${globalVars.pageNumber}`;
        const movieSearch = '/search/movie';
        const searchQueryString = `&query=${query}`;
        return fetch(
            baseUrl + movieSearch + API_KEY + queryLanguage + searchQueryString + pageCount)
        
            .then(response => response.json())
            .then(parcedData => {
                return parcedData.results;
            });
    },

    idSearch(id) {
        const idSearch = `/movie/${id}`;
        return fetch(baseUrl + idSearch + API_KEY + queryLanguage)
            .then(response => response.json())
            .then(parcedMovieById => {
                return parcedMovieById;
            });
    },
    popularSearch(){
        const popularUrl = '/movie/popular'
        return fetch(baseUrl + popularUrl + API_KEY+ queryLanguage + globalVars.pageNumber).then(response => response.json())
    }
};



