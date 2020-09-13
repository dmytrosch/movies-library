import navigateToFilmPage from './navigateToFilmPage';

// export default {
//     cardClickHeandler() {
//         const refFilmCard = document.querySelector('.films-library__gallery-item-wrap');
        
//         refFilmCard.addEventListener('click', renderFilmPage);

//         function renderFilmPage(event) { 
//             event.preventDefault();
//             // navigateToFilmPage(/film/3);
//         }
//     },

// }

export default function addFilmCardClickListener(){
    const filmListRef = document.querySelector('.films-library__gallery-list');
    console.log(filmListRef);
    filmListRef.addEventListener('click', onPageClickHandler)
}

function onPageClickHandler(event){
    console.log(event);
}