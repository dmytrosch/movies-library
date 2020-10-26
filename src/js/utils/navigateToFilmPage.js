import { router } from './router';

export default {
    addFilmCardClickListeners() {
        const filmListRef = document.querySelector('#js-film-list');
        filmListRef.addEventListener('click', this.onPageClickHandler);
    },
    onPageClickHandler(event) {
        event.preventDefault();
        const url = event.target.dataset.path;
        if (url) {
            navigateToFilmPage(url);
        }
    },
};

function navigateToFilmPage(url) {
    router.navigate(url);
}
