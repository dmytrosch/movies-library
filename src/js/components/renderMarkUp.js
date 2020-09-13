import fetchMethods from '../Api/fetchMethods';
import libraryFilmListTemplate from '../../templates/libraryFilmListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';
import mainPageCascadeTemplate from '../../templates/mainPageCascadeTemplate.hbs';
import popularMoviesListTemplate from '../../templates/popularMoviesListTemplate.hbs';
import emptySearchResponsePageTemplate from '../../templates/emptySearchResponsePageTemplate.hbs';
import searchResultListTemplate from '../../templates/searchResultListTemplate.hbs';
import globalVars from '../components/globalVars';

const refs = {
    // filmPageContainer: document.querySelector(
    //     '#js-film-page-content-container',
    // ),
    rootMain: document.querySelector('#root'),
};

export default {
    mainPageCascade() {
        const markup = mainPageCascadeTemplate();
        // refs.rootMain.innerHTML = markup;

        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
    },
    popularMovies(data) {
        const firstPartOfList = data.slice(0, 6);
        const secondPartOfList = data.slice(6, 12);
        const thirdPartOfList = data.slice(12);

        const markup = popularMoviesListTemplate(firstPartOfList) +
        popularMoviesListTemplate(secondPartOfList) +
            popularMoviesListTemplate(thirdPartOfList);
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
        this.clearMainMarkUp();
        refs.rootMain.insertAdjacentHTML('beforeend', markup);
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
        console.log('404');
    },
    pageError() {},
    noQueueListPage() {},
    clearMainMarkUp() {
        refs.rootMain.innerHTML = '';
    },
};
