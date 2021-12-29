const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { server } = require("../../src/provider.js")
const path = require("path")
const { getAccountInfoResponse} = require("../../src/getModels")
const { configurationList } = require("../../src/configurationManager")


const serverUrl = configurationList.accountapiBaseUrl
//const serverUrl = 

server.listen(5000, () => {
  //getAccountInfoResponse
    console.log(`Account API Service listening on ${serverUrl}`)
  })

// Verify that the provider meets all consumer expectations
 describe("Account API Pact verification", () => {
    it("validates the expectations of Matching Service", () => {
        let token = configurationList.accountApiBearerToken
        const opts = {
            provider: "AccountAPI_provider",
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
                "When user is not authorized": () => {
                    token = ""
                    Promise.resolve(`Invalid bearer token generated`)
                },
                "Has an account with ID 9348878860": () => {
                    token
                    getAccountInfoResponse//importData()
                    return Promise.resolve(`Account is present`)
                },
                "When a call is made to wrong account": () => {
                    token
                    getAccountInfoResponse//importData()
                    return Promise.resolve(`Account is not present`)
                }
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