import {combineReducers} from 'redux';
import configure from '../config.json'

function projectReducer(state = {}, action){
  if(action.type === configure.action.upload){
    return{
      ...state,
      target: action.target,
      conv1: [],
      conv2: [],
      conv3: [],
      conv4: [],
      out_prob: [],
      max_out: "0",
    }
  }else if(action.type === configure.action.evalution){
    return{
      ...state,
      conv1: action.conv1,
      conv2: action.conv2,
      conv3: action.conv3,
      conv4: action.conv4,
      out_prob: action.out_prob,
      max_out: action.max_out,
    }
  }else{
    return {
      ...state,
      target: "0",
      conv1: [],
      conv2: [],
      conv3: [],
      conv4: [],
      out_prob: [],
      max_out: "0",
    }
  } 
}

const rootReducer = combineReducers({
    project: projectReducer,
  });

export default rootReducer;