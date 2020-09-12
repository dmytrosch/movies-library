import fetchMethods from '../Api/fetchMethods';
import filmCardListTemplate from '../../templates/filmCardsListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';

const refs = {
    filmPageContainer: document.querySelector(
        '#js-film-page-content-container',
    ),
};

export default {
    async filmPage(id) {
        const fetchRez = await fetchMethods
            .idSearch(id)
            .catch(error => error.status_code);
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
