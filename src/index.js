import './scss/main.scss';

import Router from './js/components/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import library from './js/pages/library';
import spinner from './js/components/spinner';

spinner.show()

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
            path: 'library',
            callback: () => {
                library();
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

function onLogoClickHandler(){
  window['router'].navigate('');
}

function onLibraryBtnHandler(event) {
    event.preventDefault();
    window['router'].navigate('/library');
}
