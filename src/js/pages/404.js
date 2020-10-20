import renderMarkUp from '../components/renderMarkUp'
import {addSearchListener} from './search';

/*
  Если експортируем что-то как default название давать не обязательно
  Это не ошибка, но можно просто сделать вот так:

  export default function () {
    renderMarkUp.page404()
    addSearchListener()
  }
 */
export default function notFoundPage(){
    renderMarkUp.page404()
    addSearchListener()
}
