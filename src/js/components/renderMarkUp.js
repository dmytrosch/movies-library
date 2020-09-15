import fetchMethods from '../Api/fetchMethods';
import libraryFilmListTemplate from '../../templates/libraryFilmListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';
import mainPageCascadeTemplate from '../../templates/mainPageCascadeTemplate.hbs';
import popularMoviesListTemplate from '../../templates/popularMoviesListTemplate.hbs';
import emptySearchResponsePageTemplate from '../../templates/emptySearchResponsePageTemplate.hbs';
import searchResultListTemplate from '../../templates/searchResultListTemplate.hbs';
import pageNotFound from '../../templates/pageNotFound404.hbs';
import pageError from '../../templates/pageErrorTemplate.hbs';
import noQueryListPage from '../../templates/noQueryListPage.hbs';
import paginationButtonsTemplate from '../../templates/paginationButtonsTemplate.hbs';
import searchInputTemplate from '../../templates/searchInputTemplate.hbs';
import globalVars from '../components/globalVars';
import spinner from './spinner';

const refs = {
    rootMain: document.querySelector('#root'),
};

export default {
    mainPageCascade() {
        const markup = mainPageCascadeTemplate();
        // this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
    },
    popularMovies(data) {
        const firstPartOfList = data.slice(0, 4);
        const secondPartOfList = data.slice(4, 8);
        const thirdPartOfList = data.slice(8, 12);
        const fourPartOfList = data.slice(12, 16);
        const fivePartOfList = data.slice(16, 20);
        const markup =
            popularMoviesListTemplate(firstPartOfList) +
            popularMoviesListTemplate(secondPartOfList) +
            popularMoviesListTemplate(thirdPartOfList) +
            popularMoviesListTemplate(fourPartOfList) +
            popularMoviesListTemplate(fivePartOfList);
        const filmPageContainer = document.querySelector(
            '#js-film-page-content-container',
        );
        filmPageContainer.insertAdjacentHTML('beforeend', markup);
    },

    async filmPage(id) {
        const fetchRez = await fetchMethods.idSearch(id).catch(error => error);
        if (fetchRez.status_code === 34) {
            this.page404();
            return;
        }
        if (fetchRez.status_code === 7) {
            this.pageError();
            return;
        } else {
            const markup = filmPageTemplate(fetchRez);
            this.clearMainMarkUp();
            refs.rootMain.insertAdjacentHTML('afterbegin', markup);
            return fetchRez;
        }
    },
    searchSuccessResultPage(data) {
        const markup = searchResultListTemplate(data);
        const rootSearchResults = document.querySelector('#search-results');
        const searchBar = document.querySelector('#search-bar');
        const pagination = document.querySelector('#pagination');
        if (rootSearchResults) {
            this.clearSearchResults(rootSearchResults);
        } else {
            this.clearMainMarkUp();
        }
        if (searchBar) {
            searchBar.insertAdjacentHTML('afterend', markup);
        } else {
            const searchMarkup = searchInputTemplate();
            refs.rootMain.insertAdjacentHTML(
                'afterbegin',
                searchMarkup + markup,
            );
        }
        if (!pagination) {
            this.paginationMarkup(globalVars.pageNumber);
        }
    },
    libraryPage(data) {
        const markup = libraryFilmListTemplate(data);
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
    },
    pageEmptySearchResponseQuery() {
        const markup = emptySearchResponsePageTemplate(globalVars.searchQuery);
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
    },
    page404() {
        const markup = pageNotFound();
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
        console.log('404');
    },
    pageError() {
        const markup = pageError();
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
    },
    noQueueListPage() {
        const markup = noQueryListPage();
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
    },
    clearMainMarkUp() {
        refs.rootMain.innerHTML = '';
    },
    clearSearchResults(elem) {
        elem.remove();
    },
    paginationMarkup(data) {
        const markup = paginationButtonsTemplate(data);
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
    },
};
