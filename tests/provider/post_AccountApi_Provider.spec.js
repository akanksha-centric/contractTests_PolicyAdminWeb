const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const {postUserActivityNotesResponse } = require("../../src/getModels")
const path = require("path")
const { configurationList } = require("../../src/configurationManager")


const serverUrl = configurationList.accountapiBaseUrl

  // server.listen(5000, () => {
  //    activityData()
  //    console.log(`Account API Contact Service listening on ${SERVER_URL}`)
  //  })

// Verify that the provider meets all consumer expectations
 describe("Create new account API Pact verification", () => {
    it("validates the expectations of Matching Service", () => {
        let token = configurationList.accountApiBearerToken
        const opts = {
            provider: "AccountAPI_Post_provider",
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
                 "When call is made to create an account": () => {
                    token
                    postUserActivityNotesResponse
                    return Promise.resolve(`New account is created`)
                 },
                 "When call is made to create account but user is not authorized": () => {
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