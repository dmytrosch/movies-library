import renderMarkUp from '../components/renderMarkUp';
import fetchMethods from '../Api/fetchMethods';
import searchListener from './search';

export default async function mainPage() {
    renderMarkUp.mainPageCascade();
    searchListener();
    let popularMoviesResult;
    try {
        popularMoviesResult = await fetchMethods.popularSearch();
    } catch (error) {
        throw console.log(error);
    }
    renderMarkUp.popularMovies(popularMoviesResult);
}
