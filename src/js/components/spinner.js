const spinner = document.querySelector('#spinner');

export default {
    show() {
        spinner.classList.remove('is-hidden');
    },

    hide() {
        hideOnLoad();
    },
};

function hideOnLoad() {
    let loadingState;
    const intervalId = setInterval(() => {
        loadingState = document.readyState;
        if (loadingState === 'complete') {
            clearInterval(intervalId);
            setTimeout(() => spinner.classList.add('is-hidden'), 1000);
        }
    }, 500);
}
