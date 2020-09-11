import fetchMethods from '../Api/fetchMethods';
import filmCardListTemplate from '../../templates/filmCardsListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';
import { film } from './film';

const refs = {
    filmPageContainer: document.querySelector(
        '#js-film-page-content-container',
    ),
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
    page404() {},
    pageError() {},
};
