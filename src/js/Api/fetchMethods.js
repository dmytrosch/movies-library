import globalVars from '../components/globalVars';
import spinner from '../components/spinner';

const baseUrl = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=0c84539b7b6fe9bdba856aa5f27d88e0';
const queryLanguage = '&language=en-US';

export default {
    movieSearch() {
        spinner.show();
        const pageCount = `&page=${globalVars.pageNumber}`;
        const movieSearch = '/search/movie';
        const searchQueryString = `&query=${globalVars.searchQuery}`;
        return fetch(
            baseUrl +
                movieSearch +
                API_KEY +
                queryLanguage +
                searchQueryString +
                pageCount,
        )
            .then(response => response.json())
            .then(parcedData => {
                return parcedData;
            }).catch(error => console.log('error', error));
    },

    idSearch(id) {
        spinner.show();
        const idSearch = `/movie/${id}`;
        return fetch(baseUrl + idSearch + API_KEY + queryLanguage)
            .then(response => response.json())
            .then(parcedMovieById => {
                return parcedMovieById;
            }).catch(error => console.log(error));
    },
    popularSearch() {
        spinner.show();
        const popularUrl = '/movie/popular';
        const pageCount = `&page=${globalVars.pageNumber}`;
        return fetch(baseUrl + popularUrl + API_KEY + queryLanguage + pageCount)
            .then(response => response.json())
            .then(parcedData => {
                return parcedData.results;
            })
            .catch(error => console.log(error));
    },
    youtubeTrailerKey(id) {
        // spinner.show();

        const trailerSearchById = `/movie/${id}/videos`;
        return fetch(baseUrl + trailerSearchById + API_KEY + queryLanguage)
            .then(resp => resp.json())
            .then(parcedData => parcedData.results).catch(error => console.log(error));
    },
};
