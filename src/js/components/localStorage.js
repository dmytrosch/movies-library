export default {
// Записываем данные в LocalStorage.
    setToLS(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Получаем данные из LocalStorage.
    getFromLS(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}