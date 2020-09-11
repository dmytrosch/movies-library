import globalVars from './globalVars';

export default {
    incrementPage() {
        globalVars.pageNumber++;
    },
    decrementPage() {
        globalVars.pageNumber--;
    },
    resetPage() {
        globalVars.pageNumber = 1;
    },
};
