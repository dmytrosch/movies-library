import './scss/main.scss';

import Router from './js/utils/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import initHeader from './js/components/header'
import toTopFunction from './js/components/toTopBtn';
import toggleChapterBtns from './js/utils/toggleChapterBtns';
import { library } from './js/pages/library';
import { search } from './js/pages/search';
import { globalState } from './js/constants';

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
                globalState.searchQuery = query;
                search();
                toggleChapterBtns('search');
            },
        },
        {
            path: '404',
            callback: () => {
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

initHeader()
toTopFunction();
