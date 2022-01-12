const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const path = require("path")
const { server } = require("../../src/provider.js")
const { getAccountContactDetailsResponse} = require("../../src/getModels")
const { configurationList } = require("../../src/configurationManager")
const { allTestCases,accountApiTestCases } = require("../../src/testCasesObject")  

const serverUrl = configurationList.accountapiBaseUrl

const allTestCase=accountApiTestCases
server.listen(5000, () => {
   //importData()
    console.log(`Account API Contact Service listening on ${serverUrl}`)
  })
  

// var stateSuceess = "";
// var state401 = "";

let token = configurationList.accountApiBearerToken

// Verify that the provider meets all consumer expectations
allTestCase.forEach(element => {
  var stateSuceess = ""
  var state401 = "";
  var state404 = "";
  element.testCases.forEach(subElement => {
    if(subElement.expactedResponse==200)
    {
      stateSuceess=subElement.states
    }
    else if(subElement.expactedResponse==401)
    {
      state401=subElement.states
    }
    else if(subElement.expactedResponse==404)
    {
      state404=subElement.states
    }
    })
    describe("Contact account API Pact verification", () => {
          it("validates the expectations of Matching Service", () => {
              let token = configurationList.accountApiBearerToken
              const opts = {
                  provider: element.provider,
                  logLevel: "DEBUG",
                  providerBaseUrl: serverUrl,
                  requestFilter: (req, res, next) => {
                    console.log(
                      "Middleware invoked before provider API - injecting Authorization token"
                      )
                      req.headers["authorization"] = `Bearer ${token}`
                      next()
                    },
                    stateHandlers: {
                    [stateSuceess] : () => {
                        token
                        element.resBody
                        return Promise.resolve(`Contacts in account are present`)
                    },
                    [state404]: () => {
                      token
                      element.resBody
                      return Promise.resolve(`Account is not present`)
                  },
                    [state401]: () => {
                      token = ""
                      Promise.resolve(`Invalid bearer token generated`)
                  },
                  
                    
                    },
                  pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
                  publishVerificationResult: true,
                  enablePending: true,
                  providerVersion: "Account_API 1.0.0",
                  consumerVersionTags: ["AccountAPI"],
                  providerVersionTags: ["AccountAPI"],
              }
        
              return new Verifier(opts).verifyProvider()
              .then(output => {
                  console.log("Account API pact verification completed")
                  console.log(output)
              })
          })
        })
})

  