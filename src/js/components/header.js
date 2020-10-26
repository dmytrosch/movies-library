import {router} from '../utils/router'

const refs = {
  headerLogo: document.querySelector('#js-logo'),
  headerLinkHome: document.querySelector('#js-header-link-home'),
  headerLinkMyLibrary: document.querySelector('#js-header-link-library'),
};

function onHomePageClickHandler(event) {
  event.preventDefault();
  router.navigate('home');
}

function onLogoClickHandler(event) {
  event.preventDefault();
  router.navigate('home');
}

function onLibraryBtnHandler(event) {
  event.preventDefault();
  router.navigate('library/queue');
}

export default function() {
  refs.headerLogo.addEventListener('click', onLogoClickHandler);
  refs.headerLinkHome.addEventListener('click', onHomePageClickHandler);
  refs.headerLinkMyLibrary.addEventListener('click', onLibraryBtnHandler);
}
