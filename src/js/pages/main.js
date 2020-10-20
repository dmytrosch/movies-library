import renderMarkUp from '../components/renderMarkUp';
import fetchMethods from '../Api/fetchMethods';
import { addSearchListener } from './search';
import Siema from 'siema';
import navigateToFilmPage from '../components/navigateToFilmPage';
import addRemoveLibraryChapters from '../components/addRemoveLibraryChapters';

export default async function mainPage() {
    renderMarkUp.mainPageCascade();
    addSearchListener();

    /*
      Очень не понятная структура, и логика этого блока кода
      Не вижу смысла в блоке try ... catch
      Можно просто получить popularMoviesResult, а потом сделать проверку на то, есль ли там данные или нет
     */
    let popularMoviesResult;
    try {
        popularMoviesResult = await fetchMethods.popularSearch();
        renderMarkUp.popularMovies(popularMoviesResult);
        addRemoveLibraryChapters(popularMoviesResult);
        navigateToFilmPage.addFilmCardClickListeners();
    } catch (error) {
        throw error;
    }

    /*
      Этот кусок кода нужно вынести в отдельную функцию, а потом ее вызвать здесь же
     */
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
    setInterval(() => siema.next(), 4000);
}
