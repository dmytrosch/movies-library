import renderMarkUp from '../components/renderMarkUp'
import {addSearchListener} from './search';

export default function notFoundPage(){
    renderMarkUp.page404()
    addSearchListener()
}
