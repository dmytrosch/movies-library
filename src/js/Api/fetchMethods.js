import {pageNumber} from '../components/globalVars.js'

const baseUrl = 'https://api.themoviedb.org/3'
const movieSearch = '/search/movie'
const API_KEY = '?api_key=0c84539b7b6fe9bdba856aa5f27d88e0'

export default { 

    query: '', 
    fetchMovieSearch(){
        const pageCount = `&page=${pageNumber}`
        const search = `&query=${this.query}`
        return fetch(baseUrl+movieSearch+API_KEY+search+pageCount).then(response => response.json()).then(parcedData => {
            this.incrementPage();
            return parcedData.results;
        })
    },
    get searchQuery(){
        return this.query;
    },
    set searchQuery(string){
        this.query = string;
    }, 
    incrementPage(){
        pageNumber += 1;
    }, 
    decrementPage(){
        pageNumber --;
    }, 
    fetchIdSearch(id){
        const idSearch = '/movie/';
        return fetch(baseUrl+idSearch+id+API_KEY).then(response => response.json()).then(parcedMovieById => {
            this.incrementPage();
            return parcedMovieById;
        })
    }
}