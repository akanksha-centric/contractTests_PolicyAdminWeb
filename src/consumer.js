const axios = require("axios");
//const { postUserActivityNotesReqBody,postAccountApiReqBody, postQuickSearchApiReqBody } = require("./getModels")
const express = require("express")
const request = require("superagent")
const server = express()


const getApiEndPoint = () => process.env.API_HOST 
//|| "http://localhost:8081"
const authHeader = {
    Authorization: "Bearer token",
  }

//Fetch data for account with an ID which is currently available

const getRequestApi = function(path,jsonBody) {
  return request
      .get(`${getApiEndPoint()}${path}`)
      .set(authHeader)
      .then(res => res.body, () => null)
}

const getRequestApiError401 = function(path) {
  return request
      .get(`${getApiEndPoint()}${path}`)
      .then(res => res.status);
}
const postRequestApi = function(path,jsonBody) {
  return request
    .post(`${getApiEndPoint()}${path}`)
    .set(authHeader)
    .send(jsonBody)
    .set("Content-Type", "application/json; charset=utf-8")
    .then(res => res.body, () => null)
    
}
const postRequestApiError401 = function(path,jsonBody) {
  return request
    .post(`${getApiEndPoint()}${path}`)
    //.set(authHeader)
    .send(jsonBody)
    .set("Content-Type", "application/json; charset=utf-8")
    .then(res => res.status)    
}

module.exports = {
    server,
    getRequestApi,
    getRequestApiError401,
    postRequestApi,
    postRequestApiError401
}