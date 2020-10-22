import { globalState } from '../constants';

export default {
    incrementPage() {
        globalState.pageNumber++;
    },
    decrementPage() {
        globalState.pageNumber--;
    },
    resetPage() {
        globalState.pageNumber = 1;
    },
};
