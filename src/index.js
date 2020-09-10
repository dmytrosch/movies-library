import './style/normalize.css'
import './style/style.css'
import './style/media.css'

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
        callback: (id) => {
          filmPage(id)
        },
      },
      {
        path: '',
        callback: () => {
          mainPage();
        }
      }],
    error: {
      callback: () => {
        notFoundPage()
      }
    }
  });
