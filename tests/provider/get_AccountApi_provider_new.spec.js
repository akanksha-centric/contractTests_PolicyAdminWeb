const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { server, importData, accountRepo } = require("../../src/provider.js")
const path = require("path")

const SERVER_URL = "http://localhost:5000"

server.listen(5000, () => {
    importData()
    console.log(`Account API Service listening on ${SERVER_URL}`)
  })

// Verify that the provider meets all consumer expectations
 describe("Account API Pact verification", () => {
    it("validates the expectations of Matching Service", () => {
        let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2Mzk5OTkxMjcsImV4cCI6MTY0MDAwMjcyNywiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2Mzk5ODI4MjIsImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiQ0ExMjM2RTlENjE1NTgzRjM0QjA2REI3MTYyNTc2M0MiLCJzaWQiOiI2OTlGMTBEMUU4RjY0QjY5QTFCNTExODVFNzYyNThBQiIsImlhdCI6MTYzOTk5OTEyNywic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.UDbNZKky38kHVxsPmUvmzbVc3DFUP9hYOgosWvm2JR5O-4HWSgBjVAmyFsyEdp7HABdVrG3PH6fXDbvSjHL-VvGDFSzbATI_v8aqWkmZcp0UrV9Kdi-aysxO7HsWJRvVMB-4mzkvQUpP96gKKCtkYVBouZk4GQDl5dVbLda8imfN9O-fEoG-T8T9bHt29bYfBvCz8lxJ21RDIhTLum0trhIeMS6ft51s0tRvZbwD7mbDIBaZTiLIx5rU9ue-MAseMAfZLiKGQoRZzxkAGzDD0YnD7hyfTu9WaYiVDZn3GBzyYSJAHS3BbZ8jgxnnsTMj1sLX2NRvM35YFJoVrkwQjKsaDlrWLoZnnCg_Mf5QbDXdOC6VJXkoRPuFoGwlEkmFWJugwl00FzlpbY-wCs3Cr2pI4iw0YPl4T23RwBcdt_j8v9BJLmMbZk1yI5GWQwzWXM9aJ-HZRKB3aZ4VuyH5Wq7Ou4IbB6qApdA1O0E0sxc2Yd4g-UF0KMyihWNbRlYe"
        const opts = {
            provider: "AccountAPI_provider",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            requestFilter: (req, res, next) => {
                console.log(
                  "Middleware invoked before provider API - injecting Authorization token"
                )
                //token = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2Mzk3Mzk5NTksImV4cCI6MTYzOTc0MzU1OSwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2Mzk3MjMxMzksImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiMUIxQjUzREQ5RkVCQjRBMUI1MEJFQTMyNzMzMUIyMTUiLCJzaWQiOiIyRDA4NzIwMENEQjI5REY0RTE1NTc3QjgxNDU0MTZDQSIsImlhdCI6MTYzOTczOTk1OSwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.YggyGPDTFiaYhRKmkX1mYq3d6CHDFzICKZADJgxOQmZA0tNIuvfbkPpdrSHzoj_IVAhwzJ64T9slsTHfSZPKphn1uNNgaAvl61glbzQkk0ssZUR0RqnOaq6-sZDe4ThPVtBqJ6AY6fNkbJgMAk4UjSTc_DV11XOkftC60ljLKNJf_oBcdtvBxN2qxPykKR2hwqsnhy3bo6gi-snWqpk0Vwi8QfTfNiXfrPQ8cVr7S_Jy8c-BUPY7hUE02gFTxidVp0-v291sCahZaq9VLBO-GceLM8SbJh-0Mh07OqeR3f83jgr883U5zCplFor1IyBwbk-VaZABB_TjpjVh2lP1p9B93ZuPYxdhcqtt0s6JFBTQDIxYXRd-bOuWhd5TWM6H0dIoQPHA4GO6TUTxzo9cnnYqC4y0TKVpz3qyomq1husXejhJP9tHpk2RpVHSHrjEj_CTV4hnMAFiqYUhfkgRE6QgDWvHbZfzZFfTHqz_QUx-bNalQVa94o_C2AQjtd0t"
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
                    importData()
                    return Promise.resolve(`Account is present`)
                },
                "When a call is made to wrong account": () => {
                    token
                    importData()
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