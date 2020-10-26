import renderMarkUp from '../utils/renderMarkUp';
import { getPopularMovies } from '../Api/fetchMethods';
import { addSearchListener } from './search';
import navigateToFilmPage from '../utils/navigateToFilmPage';
import addRemoveLibraryChapters from '../utils/addRemoveLibraryChapters';
import { router } from '../utils/router';

import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import Siema from 'siema';

export default async function mainPage() {
    renderMarkUp.mainPageCascade();
    addSearchListener();
    try {
        const popularMoviesResult = await getPopularMovies();
        renderMarkUp.popularMovies(popularMoviesResult);
        addRemoveLibraryChapters(popularMoviesResult);
        navigateToFilmPage.addFilmCardClickListeners();
        runSlides();
    } catch {
        error({
            text:
                'OOPS! Something went wrong with connecting. Redirecting to saved films',
            delay: '2000',
        });
        router.navigate('library/queue');
    }
}

function runSlides() {
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
