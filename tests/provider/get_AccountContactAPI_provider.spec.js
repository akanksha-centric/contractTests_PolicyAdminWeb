const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const path = require("path")
const { getAccountInfoResponse} = require("../../src/getModels")
const { configurationList } = require("../../src/configurationManager")


const serverUrl = configurationList.accountapiBaseUrl

//server.listen(5000, () => {
  //  importData()
    //console.log(`Account API Contact Service listening on ${SERVER_URL}`)
  //})

// Verify that the provider meets all consumer expectations
 describe("Contact account API Pact verification", () => {
    it("validates the expectations of Matching Service", () => {
        let token = configurationList.accountApiBearerToken
        const opts = {
            provider: "AccountAPI_provider_contact",
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
                "When call is made to get account contact details but user is not authorized": () => {
                    token = ""
                    Promise.resolve(`Invalid bearer token generated`)
                },
                "When call made to get account contact details for id 9348878860": () => {
                    token
                    getAccountInfoResponse
                    return Promise.resolve(`Contacts in account are present`)
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