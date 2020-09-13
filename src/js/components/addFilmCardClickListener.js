import navigateToFilmPage from './navigateToFilmPage';

export default function addFilmCardClickListener() {
    const filmListRef = document.querySelector('.films-library__gallery-list');
    console.log(filmListRef);
    filmListRef.addEventListener('click', onPageClickHandler);
}

function onPageClickHandler(event) {
    event.preventDefault();
    const url = event.target.dataset.path;
    navigateToFilmPage(url);
}
