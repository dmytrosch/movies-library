export default function toggleButtons(isWatched, isInQueue, watchedBtn, queueBtn){
    if (isWatched) {
        watchedBtn.innerHTML = 'Delete from watched';
        watchedBtn.dataset.action = 'delete';
        queueBtn.innerHTML = 'Watch again';
        queueBtn.dataset.action = 'add';
    }
    if (isInQueue) {
        watchedBtn.innerHTML = 'Add to watched';
        watchedBtn.dataset.action = 'add';
        queueBtn.innerHTML = 'Delete from queue';
        queueBtn.dataset.action = 'delete';
    }
    if (!isWatched && !isInQueue) {
        queueBtn.innerHTML = 'Add to queue';
        queueBtn.dataset.action = 'add';
        watchedBtn.innerHTML = 'Add to watched';
        watchedBtn.dataset.action = 'add';
    }
}