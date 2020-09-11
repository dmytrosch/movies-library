import renderMarkUp from '../components/renderMarkUp';

export default function filmPage(id) {
    const selectedFilm = renderMarkUp.filmPage(id);

    const QUEUE_KEY_IN_LS = 'filmsQueue';
    const WATCHED_KEY_IN_LS = 'filmsWatched';
    const watchedBtn = document.getElementById('addTOwachedJS');
    const queueBtn = document.getElementById('addTOqueueJS');
    watchedBtn.addEventListener('click', toggleToWached);
    queueBtn.addEventListener('click', toggleToQueue);

    const checkIsInList = list =>
        list.find(item => item.id === selectedFilm.id);

    // Записываем данные в LocalStorage.
    const setToLS = (key, data) =>
        localStorage.setItem(key, JSON.stringify(data));

    // Получаем данные из LocalStorage.
    const getFromLS = key => JSON.parse(localStorage.getItem(key)) || [];

    //Следит за состоянием LocalStorage и меняет текст кнопок
    const monitorButtonStatusText = () => {
        const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
        const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
        queueBtn.innerHTML = checkIsInList(queueFilms)
            ? 'Delete from queue'
            : 'Add to queue';
        watchedBtn.innerHTML = checkIsInList(watchedFilms)
            ? 'Delete from watched'
            : 'Add to watched';
    };

    // Добавляем или удаляем фильм из списка "Очереди"
    const toggleToQueue = () => {
        const queueFilms = getFromLS(QUEUE_KEY_IN_LS);
        setToLS(QUEUE_KEY_IN_LS, getNewFilmList(queueFilms, selectedFilm));
        monitorButtonStatusText();
    };

    // Добавляем или удаляем фильм из списка "просмотренных" фильмов.
    const toggleToWached = () => {
        const watchedFilms = getFromLS(WATCHED_KEY_IN_LS);
        setToLS(WATCHED_KEY_IN_LS, getNewFilmList(watchedFilms, selectedFilm));
        monitorButtonStatusText();
    };

    // Получаем новый список фильмов в зависимости от того есть этот фильм в списке или нет.
    function getNewFilmList(list) {
        return checkIsInList(list)
            ? list.filter(item => item.id !== selectedFilm.id)
            : list.concat([selectedFilm]);
    }
}
