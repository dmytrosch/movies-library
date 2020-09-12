import fetchMethods from '../Api/fetchMethods';
import mainPageTemplate from '../../templates/mainPageTemplate.hbs';
import libraryFilmListTemplate from '../../templates/libraryFilmListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';

const refs = {
    filmPageContainer: document.querySelector(
        '#js-film-page-content-container',
    ),
    rootMain: document.querySelector('#root'),
};

export default {
    async filmPage(id) {
        // const filmInList = filmListResults.find(item => item.id === id);
        // const selectedFilm = filmInList
        //     ? filmInList
        //     : await fetchMethods.idSearch(id);
        const fetchRez = await fetchMethods
            .idSearch(id)
            .catch(error => error.status_code);
        console.log(fetchRez, '1st');
        if (fetchRez === 34) {
            this.page404();
        }
        if (fetchRez === 7) {
            this.pageError();
        } else {
            const markup = filmPageTemplate(fetchRez);
            refs.rootMain.insertAdjacentHTML('afterbegin', markup);
            return fetchRez;
        }
    },
    page404() {},
    pageError() {},
};
