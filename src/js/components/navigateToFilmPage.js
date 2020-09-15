export default {
    addFilmCardClickListeners(isMainPage = false) {
        let filmListRef;
        if (isMainPage) {
            filmListRef = document.querySelector('.films-library__gallery');
        } else {
            filmListRef = document.querySelector(
                '.films-library__gallery-list',
            );
        }
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
