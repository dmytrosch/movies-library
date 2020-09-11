import movieSearch from '../Api/fetchMethods'
import filmCardListTemplate from '../../templates/filmCardsListTemplate.hbs';
import filmPageTemplate from '../../templates/filmPageTemplate.hbs';

const galleryRef = document.querySelector('.films-library__gallery')
export default {
  async temp() {
    const query = 'грусть';
    const data = await movieSearch.movieSearch(query);
    const mupkup = filmCardListTemplate(data);
    galleryRef.insertAdjacentHTML('beforeend', mupkup)
  }
}
