const btnRefs = {
    home: document.querySelector('#js-header-link-home'),
    library: document.querySelector('#js-header-link-library'),
};

export default function toggleChapterBtns(chapter) {
    switch (chapter) {
        case 'home':
            btnRefs.home.dataset.status = 'selected';
            btnRefs.library.dataset.status = 'unselected';
            break;
        case 'library':
            btnRefs.library.dataset.status = 'selected';
            btnRefs.home.dataset.status = 'unselected';
            break;
        default:
            btnRefs.home.dataset.status = 'unselected';
            btnRefs.library.dataset.status = 'unselected';
    }
}
