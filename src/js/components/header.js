const refs = {
  headerLogo: document.querySelector('#js-logo'),
  headerLinkHome: document.querySelector('#js-header-link-home'),
  headerLinkMyLibrary: document.querySelector('#js-header-link-library'),
};

function onHomePageClickHandler(event) {
  window['router'].navigate('home');
}

function onLogoClickHandler() {
  window['router'].navigate('home');
}

function onLibraryBtnHandler(event) {
  event.preventDefault();
  window['router'].navigate('/library/queue');
}

export default function() {
  refs.headerLogo.addEventListener('click', onLogoClickHandler);
  refs.headerLinkHome.addEventListener('click', onHomePageClickHandler);
  refs.headerLinkMyLibrary.addEventListener('click', onLibraryBtnHandler);
}
