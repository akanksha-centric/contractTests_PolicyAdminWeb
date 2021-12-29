const axios = require("axios");
const express = require("express")
const request = require("superagent")
const server = express()
const fs = require('fs')

const dataBuffer = fs.readFileSync('./src/configurations.json')
const dataJSON = dataBuffer.toString()
//return all configutaion 
const configurationList = JSON.parse(dataJSON)
//return only token
const getAccountApiBearerToken = configurationList.accountApiBearerToken

//Save modified configuration
const saveConfiguration =configList=> {
    console.log(configList.accountApiBearerToken)
    const configJSON = JSON.stringify(configList)
    fs.writeFileSync('./src/configurations.json', configJSON)
  }



module.exports = {
    server,
    saveConfiguration,
    configurationList
}