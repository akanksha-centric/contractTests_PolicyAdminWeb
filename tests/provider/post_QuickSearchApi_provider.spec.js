const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { postQuickSearchResponse } = require("../../src/getModels")
const path = require("path")
const { configurationList } = require("../../src/configurationManager")
const { server } = require("../../src/provider.js")

const SERVER_URL = configurationList.accountapiBaseUrl

   server.listen(5000, () => {
    //activityData()
    console.log(`Account API Contact Service listening on ${SERVER_URL}`)
   })

// Verify that the provider meets all consumer expectations
 describe("Quick search Account api pact verification", () => {
    it("validates the expectations of Matching Service", () => {
        let token = configurationList.accountApiBearerToken
        const opts = {
            provider: "QuickSearch_provider",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            requestFilter: (req, res, next) => {
                console.log(
                  "Middleware invoked before provider API - injecting Authorization token"
                )
                req.headers["authorization"] = `Bearer ${token}`
                next()
              },
              stateHandlers: {
                 "Quick search of an account": () => {
                    token
                    postQuickSearchResponse
                    return Promise.resolve(`Quick search is done`)
                 },
                 "When user is not authorized while quick search": () => {
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
            console.log("Quick search API pact verification completed")
            console.log(output)
        })
    })
})