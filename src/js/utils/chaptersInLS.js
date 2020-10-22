export function setToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function getFromLS(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
export function addToList(list, key, film) {
    const newList = [...list, film];
    setToLS(key, newList);
}
export function deleteFromList(list, filmId, key) {
    const newList = list.filter(item => item.id != filmId);
    setToLS(key, newList);
}
export function checkIsInList(list, filmId) {
    return list.some(item => item.id == filmId);
}
