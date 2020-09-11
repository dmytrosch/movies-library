import {
    pageNumber
}
from './globalVars.js';

export default {
    incrementPage() {
        pageNumber ++;
    },
    decrementPage() {
        pageNumber--;
    },
    resetPage() {
        pageNumber = 1;
    }, }
