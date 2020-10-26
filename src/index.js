import './scss/main.scss';

import { router } from './js/utils/router';
import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import initHeader from './js/components/header';
import toTopFunction from './js/components/toTopBtn';
import toggleChapterBtns from './js/utils/toggleChapterBtns';
import { library } from './js/pages/library';
import { search } from './js/pages/search';
import { globalState } from './js/constants';

router
    .on({
        'film/:id': params => {
            filmPage(params.id);
            toggleChapterBtns('filmpage');
        },
        'library/queue': () => {
            library('queue');
            toggleChapterBtns('library');
        },
        'library/watched': () => {
            library('watched');
            toggleChapterBtns('library');
        },
        'search/:query': params => {
            globalState.searchQuery = params.query;
            search();
            toggleChapterBtns('search');
        },
        'home': () => {
            mainPage();
            toggleChapterBtns('home');
        },
        '*': () => {
            notFoundPage();
            toggleChapterBtns('404');
        },
    })
    .resolve();

if (window.location.pathname === '/') {
    router.navigate('home');
}

initHeader();
toTopFunction();
