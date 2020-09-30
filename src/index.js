import './scss/main.scss';

import Router from './js/components/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import toTopFunction from './js/components/toTopBtn';
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
            },
        },
        {
            path: 'library/queue',
            callback: () => {
                library('queue');
            },
        },
        {
            path: 'library/watched',
            callback: () => {
                library('watched');
            },
        },
        {
            path: /search\/(.*)/,
            callback: query => {
                globalVars.searchQuery = query;
                search();
            },
        },
        {
            path: '404',
            callback: () => {
                console.log('nfound');
                notFoundPage();
            },
        },
        {
            path: '',
            callback: () => {
                mainPage();
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
