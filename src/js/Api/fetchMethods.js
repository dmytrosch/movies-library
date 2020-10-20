/*
  Почему globalVars находиться в ./src/components ??
  Это же просто константы. А значит им место в дериктории констант
  К примеру ./src/constants/index.js
  Я создал файл, с этими константами. Разберитесь и зайюзайте их правельно.
  Не путайте компонетны и не компонетны
 */
import globalVars from '../components/globalVars';

/*
  По сути же, и эти переменные так же можно вынести в ./src/constants/index.js
  Но это не критично, и на ваше рассуждение
 */
const baseUrl = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=0c84539b7b6fe9bdba856aa5f27d88e0';
const queryLanguage = '&language=en-US';


/*
  А почему бы екпортировать не обьект, а каждый отдельный метод?
  Так на много проще оперировать импортами, и на много проще потом искать использование каждого метода в коде
  К примеру так:

  export const getMoviesBySearch = () => {
    const pageCount = `&page=${globalVars.pageNumber}`;
    const movieSearch = '/search/movie';
    const searchQueryString = `&query=${globalVars.searchQuery}`;
    const url = baseUrl + movieSearch + API_KEY + queryLanguage + searchQueryString + pageCount;

    return fetch(url)
      .then(response => response.json())
      .then(parsedData => {
        return parsedData;
      }).catch(error => console.log(error));
  }
 */

export default {
    movieSearch() {
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
            }).catch(error => console.log(error));
    },

    idSearch(id) {
        const idSearch = `/movie/${id}`;
        return fetch(baseUrl + idSearch + API_KEY + queryLanguage)
            .then(response => response.json())
            .then(parcedMovieById => {
                return parcedMovieById;
            }).catch(error => console.log(error));
    },
    popularSearch() {
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
        const trailerSearchById = `/movie/${id}/videos`;
        return fetch(baseUrl + trailerSearchById + API_KEY + queryLanguage)
            .then(resp => resp.json())
            .then(parcedData => parcedData.results).catch(error => console.log(error));
    },
};
