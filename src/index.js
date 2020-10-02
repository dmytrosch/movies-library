import './scss/main.scss';

import Router from './js/components/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import toTopFunction from './js/components/toTopBtn';
import toggleChapterBtns from './js/components/toggleChapterBtns';
import { library } from './js/pages/library';
import { search } from './js/pages/search';
import globalVars from './js/components/globalVars';

window['router'] = new Router({
    root: '/',
    routes: [
        {
            path: /film\/(.*)/,
            callback: id => {
                filmPage(id);
                toggleChapterBtns('filmpage');
            },
        },
        {
            path: 'library/queue',
            callback: () => {
                library('queue');
                toggleChapterBtns('library');
            },
        },
        {
            path: 'library/watched',
            callback: () => {
                library('watched');
                toggleChapterBtns('library');
            },
        },
        {
            path: /search\/(.*)/,
            callback: query => {
                globalVars.searchQuery = query;
                search();
                toggleChapterBtns('search');
            },
        },
        {
            path: '404',
            callback: () => {
                console.log('nfound');
                notFoundPage();
                toggleChapterBtns('404');
            },
        },
        {
            path: '',
            callback: () => {
                mainPage();
                toggleChapterBtns('home');
            },
        },
    ],
    error: {
        callback: () => {},
    },
});

const refs = {
    headerLogo: document.querySelector('#js-logo'),
    headerLinkHome: document.querySelector('#js-header-link-home'),
    headerLinkMyLibrary: document.querySelector('#js-header-link-library'),
};

refs.headerLogo.addEventListener('click', onLogoClickHandler);
refs.headerLinkHome.addEventListener('click', onHomePageClickHandler);
refs.headerLinkMyLibrary.addEventListener('click', onLibraryBtnHandler);

toTopFunction();

function onHomePageClickHandler(event) {
    event.preventDefault();
    window['router'].navigate('');
}

function onLogoClickHandler() {
    window['router'].navigate('');
}

function onLibraryBtnHandler(event) {
    event.preventDefault();
    window['router'].navigate('/library/queue');
}
