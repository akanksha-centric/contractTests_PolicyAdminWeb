const axios = require("axios");
const { postUserActivityNotesReqBody,postAccountApiReqBody, postQuickSearchApiReqBody } = require("./getModels")
const express = require("express")
const request = require("superagent")
const server = express()


const getApiEndPoint = () => process.env.API_HOST 
//|| "http://localhost:8081"
const authHeader = {
    Authorization: "Bearer token",
  }

//Fetch data for account with an ID which is currently available
const getAccount = id => {
    //console.log(`${getApiEndPoint()}${id}`)
    return request
        .get(`${getApiEndPoint()}${id}`)
        .set(authHeader)
        .then(res => res.body, () => null)
}

const getErrorAccount = id => {
    return request
        .get(`${getApiEndPoint()}${id}`)
        .then(res => res.status);
}

const createApiCall = id=> {
    console.log(`${getApiEndPoint()}${id}`)
    return request
      .post(`${getApiEndPoint()}${id}`)
      .set(authHeader)
      .send(postUserActivityNotesReqBody)
      .set("Content-Type", "application/json; charset=utf-8")
      .then(res => res.body, () => null)
      
  }
  const postApiError = id => {
    console.log(`${getApiEndPoint()}${id}`)
    return request
      .post(`${getApiEndPoint()}${id}`)
      //.set(authHeader)
      .send(postUserActivityNotesReqBody)
      .set("Content-Type", "application/json; charset=utf-8")
      .then(res => res.status)    
  }
  const createAccountApiCall = id => {
    console.log(`${getApiEndPoint()}${id}`)
    return request
      .post(`${getApiEndPoint()}${id}`)
      .set(authHeader)
      .send(postAccountApiReqBody)
      .set("Content-Type", "application/json; charset=utf-8")
      .then(res => res.body, () => null)
      
  }
  const postAccountApiError = id => {
    console.log(`${getApiEndPoint()}${id}`)
    return request
      .post(`${getApiEndPoint()}${id}`)
      //.set(authHeader)
      .send(postAccountApiReqBody)
      .set("Content-Type", "application/json; charset=utf-8")
      .then(res => res.status)    
  }

  const postQuickSerach = id => {
    console.log(`${getApiEndPoint()}${id}`)
    return request
    .post(`${getApiEndPoint()}${id}`)
    .set(authHeader)
    .send(postQuickSearchApiReqBody)
    .set("Content-Type", "application/json; charset=utf-8")
    .then(res => res.status)
  }

  const postQuickSearchApiError = id => {
    console.log(`${getApiEndPoint()}${id}`)
    return request
      .post(`${getApiEndPoint()}${id}`)
      //.set(authHeader)
      .send(postQuickSearchApiReqBody)
      .set("Content-Type", "application/json; charset=utf-8")
      .then(res => res.status)    
  }
 

module.exports = {
    server,
    getAccount,
    postApiError,
    getErrorAccount,
    createApiCall,
    postAccountApiError,
    createAccountApiCall,
    postQuickSerach,
    postQuickSearchApiError
}