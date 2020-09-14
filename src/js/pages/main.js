import renderMarkUp from '../components/renderMarkUp';
import fetchMethods from '../Api/fetchMethods';
import searchListener from './search';
import Siema from 'siema';
import spinner from '../components/spinner';
import navigateToFilmPage from '../components/navigateToFilmPage';

export default async function mainPage() {
  spinner.show();
  renderMarkUp.mainPageCascade();
  searchListener();
  let popularMoviesResult;
  try {
    popularMoviesResult = await fetchMethods.popularSearch();
    spinner.hide();
    renderMarkUp.popularMovies(popularMoviesResult);
    navigateToFilmPage.addFilmCardClickListeners();
  } catch (error) {
    throw console.log(error);
  }
  let timeId = null;
  const siema = new Siema({
    selector: '.siema',
    duration: 800,
    loop: true,
    easing: "cubic-bezier(.42,0,.58,1)",
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    rtl: false,
    onInit: () => {},
    onChange: () => {},
  });
  timeId = setInterval(() => siema.next(), 4000)
}
