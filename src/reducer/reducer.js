import {combineReducers} from 'redux';
import configure from '../config.json'

function projectReducer(state = {}, action){
  if(action.type === configure.action.upload){
    return{
      ...state,
      target: action.target,
      audioFiles: action.audioFiles,
      conv1: [],
      conv1_1: [],
      conv2: [],
      conv2_1: [],
      conv3: [],
      conv3_1: [],
      conv4: [],
      out_prob: [],
      max_out: "0",
      max_out_list: [],
      out_prob_list: [],
    }
  }else if(action.type === configure.action.evalution){
    return{
      ...state,
      conv1: action.conv1,
      conv1_1: action.conv1_1,
      conv2: action.conv2,
      conv2_1: action.conv2_1,
      conv3: action.conv3,
      conv3_1: action.conv3_1,
      conv4: action.conv4,
      out_prob: action.out_prob,
      max_out: action.max_out,
      max_out_list: action.max_out_list,
      out_prob_list: action.out_prob_list,
    }
  }else if(action.type === configure.action.time){
    return {
      ...state,
    }
  }else{
    return {
      ...state,
      target: "0",
      audioFiles: [],
      conv1: [],
      conv1_1: [],
      conv2: [],
      conv2_1: [],
      conv3: [],
      conv3_1: [],
      conv4: [],
      out_prob: [],
      max_out: "0",
      max_out_list: [],
      out_prob_list: [],
    }
  } 
}

function timeReducer(state = 0, action){
  if(action.type === configure.action.time){
    return{
      time: action.time,
    }
  }else{
    return state
  }
}

const rootReducer = combineReducers({
  project: projectReducer,
  time: timeReducer,
});

export default rootReducer;