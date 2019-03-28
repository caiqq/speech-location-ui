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
 * @param {*} data 
 * @param {*} cb 
 */
export function fetchSpikeDatas(data, cb){
    const newURL = "/repository/" + id
    options.method = 'POST'
    options.body = data
    return fetch(newURL, options)
    .then(response => response.json())
    .then(cb)
}