const btnRefs = {
    home: document.querySelector('#js-header-link-home'),
    library: document.querySelector('#js-header-link-library'),
};

export default function toggleChapterBtns(chapter) {
    if (chapter === 'home') {
        btnRefs.home.dataset.status = 'selected';
        btnRefs.library.dataset.status = 'unselected';
        return;
    }
    if (chapter === 'library') {
        btnRefs.library.dataset.status = 'selected';
        btnRefs.home.dataset.status = 'unselected';
        return;
    } else {
        btnRefs.home.dataset.status = 'unselected';
        btnRefs.library.dataset.status = 'unselected';
    }
}
