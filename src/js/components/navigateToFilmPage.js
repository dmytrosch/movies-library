export default {
    addFilmCardClickListeners() {
        const filmListRef = document.querySelector(
            '.films-library__gallery-list',
        );
        filmListRef.addEventListener('click', this.onPageClickHandler);
    },
    onPageClickHandler(event) {
        event.preventDefault();
        const url = event.target.dataset.path;
        navigateToFilmPage(url);
    },
};

function navigateToFilmPage(url) {
    window['router'].navigate(url);
};
