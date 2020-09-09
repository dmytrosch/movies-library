import './style/normalize.css'
import './style/style.css'
import './style/media.css'

import Router from './js/components/router.js';

import mainPage from './js/pages/main';
import filmPage from './js/pages/filmPage';
import notFoundPage from './js/pages/404'

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
        path: 'main',
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
