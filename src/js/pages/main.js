import mainPageTemplate from '../../templates/mainPageTemplate.hbs';
import movieListTemplate from '../../templates/filmCardsListTemplate.hbs';
import fetchMethods from '../Api/fetchMethods';

const refs = {
    rootElement: document.querySelector('#root'),
    filmList: document.querySelector('.films-library__gallery'),
};

function renderBaseMainPageMarkup() {
    const markup = mainPageTemplate();
    refs.rootElement.innerHTML = markup;
}

function renderMovieListItems(data) {
    const firstPartOfMarkup = data.slice(0, 6);
    const secondPartOfMarkup = data.slice(6, 12);
    const thirdPartOfMarkup = data.slice(12);

    const markup =
        movieListTemplate(firstPartOfMarkup) +
        movieListTemplate(secondPartOfMarkup) +
        movieListTemplate(thirdPartOfMarkup);

    refs.filmList.insertAdjacentHTML('beforeend', markup);
}

async function mainPage() {
    renderBaseMainPageMarkup();

    const filmsData = await fetchMethods.popularFilms();

    renderMovieListItems(filmsData);
}

export default mainPage;
