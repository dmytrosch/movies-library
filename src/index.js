import './scss/main.scss';

import Router from './js/components/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404';
import renderMarkUp from './js/components/renderMarkUp';
import library from './js/pages/library';
import './js/components/siema'

mainPage();


window['router'] = new Router({
  root: '/',
  routes: [{
      path: /film\/(.*)/,
      callback: id => {
        filmPage(id);
      },
    },
    {
      path: '',
      callback: () => {
        // mainPage();
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

refs.headerLogo.addEventListener('click', onMainPageClickHandler);
refs.headerLinkHome.addEventListener('click', onMainPageClickHandler);
refs.headerLinkMyLibrary.addEventListener('click', onLibraryBtnHandler);

function onMainPageClickHandler(event) {
  event.preventDefault();
  mainPage();
}

function onLibraryBtnHandler(event) {
  event.preventDefault();
  library();
}
