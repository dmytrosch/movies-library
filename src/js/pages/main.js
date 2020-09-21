import renderMarkUp from '../components/renderMarkUp';
import fetchMethods from '../Api/fetchMethods';
import searchListener from './search';
import Siema from 'siema';
import navigateToFilmPage from '../components/navigateToFilmPage';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';

export default async function mainPage() {
    renderMarkUp.mainPageCascade();
    searchListener();
    let popularMoviesResult;
    try {
        popularMoviesResult = await fetchMethods.popularSearch();
        renderMarkUp.popularMovies(popularMoviesResult);
        addRemoveLibraryChapters(popularMoviesResult, true);
        navigateToFilmPage.addFilmCardClickListeners(true);
    } catch (error) {
        throw error;
    }

    const siema = new Siema({
        selector: '.siema',
        duration: 1000,
        easing: 'ease-out',
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
    setInterval(() => siema.next(), 4000)
}
