export default {
    addFilmCardClickListeners() {
        const filmListRef = document.querySelector('.films-library__gallery');
        filmListRef.addEventListener('click', this.onPageClickHandler);
    },
    onPageClickHandler(event) {
        event.preventDefault();
        const url = event.target.dataset.path;
        if (url) {
            navigateToFilmPage(url);
        } else {
            return;
        }
    },
};

function navigateToFilmPage(url) {
    window['router'].navigate(url);
}
