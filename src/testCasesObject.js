const axios = require("axios");
const { getAccountInfoResponse,getAccountContactDetailsResponse,
    postUserActivityNotesReqBody,postAccountApiResponse,
    postAccountApiReqBody, postQuickSearchApiReqBody } = require("./getModels")
const express = require("express")
const request = require("superagent")
const server = express()



const accountApiTestCases=
[
//******************Account API**********//
   // Get account  contact details 
    {
    consumer:"GetAccountContactDetails_consumer",
    provider:"GetAccountContactDetails_provider",
    methodType:"GET",
    apiPath:"/v1/accounts/9348878860/contactDetails",
    header:"Bearer Token",
    reqBody:getAccountContactDetailsResponse,
    resBody:getAccountContactDetailsResponse,
    testCases:[{
        expactedResponse:200,
        states:"When call made to get account contact details for id 9348878860",
        uponreceiving:"200 OK return account contact details",
        requiredComparision:false,
        propertyToCompare:"NA",
        valueToCompare:"NA"
    },
    {
        expactedResponse:401,
        states:"When call is made to get account contact details but user is not authorized",
        uponreceiving:"Unauthorized 401",
        requiredComparision:false,
        propertyToCompare:"NA",
        valueToCompare:"NA"
    },]
},
{
    consumer:"PostAccount_Consumer",
    provider:"PostAccount_Provider",
    // consumer:"GetAccountContactDetails_consumer",
    // provider:"GetAccountContactDetails_provider",
    methodType:"POST",
    apiPath:"/v1/accounts",
    header:"Bearer Token",
    reqBody:postAccountApiReqBody,
    resBody:postAccountApiResponse,
    testCases:[{
        expactedResponse:200,
        states:"When call is made to create an account",
        uponreceiving:"200 OK Account gets created",
        requiredComparision:false,
        propertyToCompare:"NA",
        valueToCompare:"NA"
    },
    {
        expactedResponse:401,
        states:"When call is made to create account but user is not authorized",
        uponreceiving:"Unauthorized 401",
        requiredComparision:false,
        propertyToCompare:"NA",
        valueToCompare:"NA"
    },]
},
{
    consumer:"GetAccountInfo_consumer",
    provider:"GetAccountInfo_provider",
    // consumer:"GetAccountContactDetails_consumer",
    // provider:"GetAccountContactDetails_provider",
    methodType:"GET",
    apiPath:"/v1/accounts/9348878860",
    header:"Bearer Token",
    reqBody:getAccountInfoResponse,
    resBody:getAccountInfoResponse,
    testCases:[
        {
        expactedResponse:200,
        states:"When call made to get account info for id 9348878860",
        uponreceiving:"200 OK return account info for id 9348878860",
        requiredComparision:false,
        propertyToCompare:"NA",
        valueToCompare:"NA"
    },
    
    {
        expactedResponse:404,
        apiPathNotFound:"/v1/accounts/93488788",
        states:"When call is made to get account info but account not exist",
        uponreceiving:"404 Not found",
        requiredComparision:false,
        propertyToCompare:"NA",
        valueToCompare:"NA"
    },
    {
        expactedResponse:401,
        states:"When call is made to get account info but user is not authorized",
        uponreceiving:"Unauthorized 401",
        requiredComparision:false,
        propertyToCompare:"NA",
        valueToCompare:"NA"
    },
    ]
}
]

module.exports = {
     accountApiTestCases,
}