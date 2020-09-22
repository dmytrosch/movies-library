import './scss/main.scss';

import Router from './js/components/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import library from './js/pages/library';
import { search } from './js/pages/search';
import spinner from './js/components/spinner';
import globalVars from './js/components/globalVars';

spinner.show();

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
            callback: ()=>{
                library('watched')
            }
        },
        {
            path: /search\/(.*)/,
            callback: query => {
                globalVars.searchQuery = query;
                search();
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
            // console.log('404');
            // notFoundPage();
        },
    },
});

const refs = {
    headerLogo: document.querySelector('.library__nav-icon'),
    headerLinkHome: document.querySelector('#headerNavHome'),
    headerLinkMyLibrary: document.querySelector('#headerNavMyLibrary'),
};

refs.headerLogo.addEventListener('click', onLogoClickHandler);
refs.headerLinkHome.addEventListener('click', onHomePageClickHandler);
refs.headerLinkMyLibrary.addEventListener('click', onLibraryBtnHandler);

function onHomePageClickHandler(event) {
    // event.preventDefault(); //временно сделали перезагрузку до решения проблем со спинером
    window['router'].navigate('');
}

function onLogoClickHandler() {
    window['router'].navigate('');
}

function onLibraryBtnHandler(event) {
    event.preventDefault();
    window['router'].navigate('/library/queue');
}
