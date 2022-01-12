const { raw } = require('body-parser');
const request = require('request');
const fs = require('fs')

const dataBuffer = fs.readFileSync('./configurations.json')
const dataJSON = dataBuffer.toString()
//return all configutaion 
const configurationList = JSON.parse(dataJSON)
//return only token
const getAccountApiBearerToken = configurationList.accountApiBearerToken
//Save modified configuration
const saveConfiguration =configList=> {
    const configJSON = JSON.stringify(configList)
    fs.writeFileSync('./configurations.json', configJSON)
  }

  const getTokenRequestBody = {
    grant_type: "client_credentials",
    client_id: configurationList.clientId,
    client_secret: configurationList.clientSecret
  }
  
  request({
    method: 'POST',
    preambleCRLF: true,
    postambleCRLF: true,
    uri: 'http://neptune.cmiprog.com/CentralApiGateway/AuthorizationServer/connect/token',
    form: getTokenRequestBody
  },
  function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    configurationList.accountApiBearerToken=JSON.parse(body).access_token
    saveConfiguration(configurationList)
    //console.log('Upload successful!  Server responded with:', JSON.parse(body).access_token);
  })

  //-----Code to generate client id and client secret, Once it will execute it will write client id
  //-----and client secret to console

  // const formData = {
  //   "applicationName": "test",
  //   "redirectUrl": "",
  //   "requestedScopes": [
  //     "backend"
  //   ]
  // }
// request({
//     method: 'POST',
//     preambleCRLF: true,
//     postambleCRLF: true,
//     uri: 'http://proteus.cmiprog.com/AuthorizationManagement/api/v1/Register/ClientCredential',
//     json: true,
//     body:formData
//   },
//   function (error, response, body) {
//     if (error) {
//       return console.error('upload failed:', error);
//     }
//     console.log('Upload successful!  Server responded with:', body.clientId);
//   })