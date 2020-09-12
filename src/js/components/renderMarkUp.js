import fetchMethods from '../Api/fetchMethods';
import filmCardListTemplate from '../../templates/filmCardsListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';
import libraryFilmCardsTemplate from '../../templates/libraryFilmCardsTemplate.hbs';

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
            refs.filmPageContainer.insertAdjacentHTML('afterbegin', markup);
            return fetchRez;
        }
    },
    libraryPage(data){
        const markup = libraryFilmCardsTemplate(data);
        refs.rootMain.insertAdjacentHTML("beforeend", markup);
    },
    page404() {},
    pageError() {},
};

