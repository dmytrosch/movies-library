const throttle = require('lodash.throttle');
const btnToUpRef = document.querySelector('#js-btn-to-up');

export default function toTopButton() {
    window.addEventListener('scroll', throttle(trackScroll, 200));
    btnToUpRef.addEventListener('click', backToTop);
}

function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        btnToUpRef.classList.add('footer__btn-up--show');
    }
    if (scrolled < coords) {
        btnToUpRef.classList.remove('footer__btn-up--show');
    }
}
function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}
