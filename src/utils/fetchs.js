import fetch from 'isomorphic-fetch'
// import { polyfill } from 'es6-promise'

const options = {
  method: "POST",
  header: {
    // 'Content-Type':'application/json; charsets=UTF-8',
    'Content-Type':'application/x-www-form-urlencoded; charsets=UTF-8',
    'Access-Control-Allow-Origin':'*',
    'Accept': 'text/html',
    'Cache-Control': 'no-cache'
  },
  mode: 'cors',  //cross domain
  body: {},
}

/**
 * 
 * @param {*} file_name 
 * @param {*} cb 
 */
export function fetchEvalutionProject(file_name, cb){
  const newURL = "/sound/" + file_name
  options.method = 'POST'
  return fetch(newURL, options)
  .then(response => response.json())
  .then(cb)
}

export function fetchUploadProject(file_name, cb){
  const newURL = "/location/" + file_name
  options.method = 'POST'
  return fetch(newURL, options)
  .then(response => response.json())
  .then(cb)
}