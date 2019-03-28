import { createStore } from 'redux'
import rootReducer from '../reducer/reducer'

function configureScore(){
  const store = createStore(rootReducer);
  return store;
}

const store = configureScore()
export default store;