import navigateToFilmPage from '../components/navigateToFilmPage';

export default {
    cardClickHeandler() {
        const refFilmCard = document.querySelector('.films-library__gallery-item-wrap');
        
        refFilmCard.addEventListener('click', renderFilmPage);

        function renderFilmPage(event) { 
            event.preventDefault();
            // navigateToFilmPage(/film/3);
        }
    },

}