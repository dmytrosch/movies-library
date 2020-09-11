import fetchMethods from '../Api/fetchMethods';
import filmCardListTemplate from '../../templates/filmCardsListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';
import { film } from './film';
const filmListResults = [film];

export default {
    filmPage: async id => {
        const filmInList = filmListResults.find(item => item.id === id);
        const selectedFilm = filmInList
            ? filmInList
            : await fetchMethods.idSearch(id);
        filmPageTemplate(selectedFilm);
        return selectedFilm;
    },
};
