const axios = require("axios");
const express = require("express")
const request = require("superagent")
const server = express()

//*******ALL REQUEST BODY********

//-------ACCOUNT API------
const postAccountApiReqBody = require("../data/RequestBody/AccountApi/postAccountApiReqBody.json");
const getAccountContactDetailsResponse = require("../data/ResponseBody/AccountApi/getAccountContactDetailsResponse.json");
const getAccountInfoResponse = require("../data/ResponseBody/AccountApi/getAccountInfoResponse.json");
const postAccountApiResponse = require("../data/ResponseBody/AccountApi/postAccountApiResponse.json")


//-------USER ACTIVITY NOTES-----
const postUserActivityNotesResponse = require("../data/ResponseBody/UserActivityApi/postUserActivityNotesResponse.json")
const postUserActivityNotesReqBody = require("../data/RequestBody/UserActivityApi/postUserActivityNotesReqBody.json");





module.exports = {
    server,
    postAccountApiReqBody,
    getAccountContactDetailsResponse,
    getAccountInfoResponse,
    postAccountApiResponse,
    postUserActivityNotesResponse,
    postUserActivityNotesReqBody
  }  