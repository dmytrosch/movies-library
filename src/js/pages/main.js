import renderMarkUp from '../components/renderMarkUp';
import fetchMethods from '../Api/fetchMethods';
import searchListener from './search';
import Siema from 'siema';
import spinner from '../components/spinner';



export default async function mainPage() {
  spinner.show();
  renderMarkUp.mainPageCascade();
  searchListener();
  let popularMoviesResult;
  try {
    popularMoviesResult = await fetchMethods.popularSearch();
    spinner.hide();
  } catch (error) {
    throw console.log(error);
  }
  renderMarkUp.popularMovies(popularMoviesResult);

  const siema = new Siema({
    selector: '.siema',
    duration: 200,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: false,
    rtl: false,
    onInit: () => {},
    onChange: () => {},
  })

}
