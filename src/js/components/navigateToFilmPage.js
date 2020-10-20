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
        } else {
            // Зачем этот return? В нем нет никакого смысла.
            // Кострукцию else можно вообще удалить
            return;
        }

        // Как вариант предлагаю сделать так
        // url && navigateToFilmPage(url)
    },
};

function navigateToFilmPage(url) {
    window['router'].navigate(url);
}
