import {combineReducers} from 'redux';
import configure from '../config.json'

function projectReducer(status=[], action){
    return status;
}

const rootReducer = combineReducers({
    project: projectReducer,
  });

export default rootReducer;