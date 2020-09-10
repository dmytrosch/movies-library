import './style/normalize.css';
import './style/style.css';
import './style/media.css';

import Router from './js/components/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import './js/pages/search.js';

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
            path: '',
            callback: () => {
                mainPage();
            },
        },
    ],
    error: {
        callback: () => {
            notFoundPage();
        },
    },
});

const refs = {
    headerLogo: document.querySelector('.library__nav-icon'),
    headerLinkHome: document.querySelector('#headerNavHome'),
    headerLinkMyLibrary: document.querySelector('#headerNavMyLibrary'),
};

refs.headerLogo.addEventListener('click', () => {
  mainPage();
});
refs.headerLinkHome.addEventListener('click', () => {
    mainPage();
});
refs.headerLinkMyLibrary.addEventListener('click', () => {
  library();
});
