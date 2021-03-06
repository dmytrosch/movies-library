import libraryFilmListTemplate from '../../templates/libraryFilmListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';
import mainPageCascadeTemplate from '../../templates/mainPageCascadeTemplate.hbs';
import popularMoviesListTemplate from '../../templates/popularMoviesListTemplate.hbs';
import emptySearchResponsePageTemplate from '../../templates/emptySearchResponsePageTemplate.hbs';
import searchResultListTemplate from '../../templates/searchResultListTemplate.hbs';
import noAddedYetPageTemplate from '../../templates/noAddedYetPageTemplate.hbs';
import paginationButtonsTemplate from '../../templates/paginationButtonsTemplate.hbs';
import searchInputTemplate from '../../templates/searchInputTemplate.hbs';
import pageNotFoundTemplate from '../../templates/pageNotFound404.hbs';

import { globalState } from '../constants';

import spinner from '../components/spinner';

const refs = {
    rootMain: document.querySelector('#root'),
};

export default {
    mainPageCascade() {
        spinner.show();
        const markup = mainPageCascadeTemplate();
        const searchBar = searchInputTemplate();
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', searchBar + markup);
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
        const filmPageContainer = document.querySelector('#js-film-list');
        filmPageContainer.insertAdjacentHTML('beforeend', markup);
        spinner.hide();
    },

    filmPage(data) {
        spinner.show();
        const markup = filmPageTemplate(data);
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('afterbegin', markup);
        spinner.hide();
    },
    searchSuccessResultPage(data) {
        spinner.show();
        const markup = searchResultListTemplate(data);
        const rootSearchResults = document.querySelector('#js-search-result');
        const pagination = document.querySelector('#pagination');
        if (rootSearchResults) {
            this.clearSearchResults(rootSearchResults);
        } else {
            this.clearMainMarkUp();
        }
        const searchBar = document.querySelector('#search-bar');
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
            this.paginationMarkup(globalState.pageNumber);
        }
        window.scrollBy(0, -window.pageYOffset + 65);
        spinner.hide();
    },
    libraryPage(data) {
        spinner.show();
        const markup = libraryFilmListTemplate(data);
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
        spinner.hide();
    },
    pageEmptySearchResponseQuery() {
        spinner.show();
        const markup = emptySearchResponsePageTemplate(globalState.searchQuery);
        const searchMarkup = searchInputTemplate();
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('afterbegin', searchMarkup + markup);
        spinner.hide();
    },
    page404() {
        spinner.show();
        const markup404 = pageNotFoundTemplate();
        const markupSearchBar = searchInputTemplate();
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('afterbegin', markupSearchBar);
        refs.rootMain.insertAdjacentHTML('beforeend', markup404);
        spinner.hide();
    },
    noAddedYetPage(chapter) {
        spinner.show();
        const isQueueChapter = chapter === 'queue' ? true : false;
        const markup = noAddedYetPageTemplate(isQueueChapter);
        const markupSearchBar = searchInputTemplate();
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markupSearchBar + markup);
        spinner.hide();
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
    filmTrailerOverlay(videoKey){
        return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }
};
