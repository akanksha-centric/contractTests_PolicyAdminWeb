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
        let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2NDAyMzU0MzgsImV4cCI6MTY0MDIzOTAzOCwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2NDAxNjczMDMsImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiOENGRjBCQkI5Qzc2NkYzNUNCMzg4MzU1M0YzRTAzNTUiLCJzaWQiOiI0RjQ4MEM3MzlFQUE3OUVCQTE1MDExNEU1RUYyNTBGQiIsImlhdCI6MTY0MDIzNTQzOCwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.qURGiDR5yuExcpusHwaWpe2M5kjIEglg7oIZ6k-9JPy-FozB_-rUn2xvt-zXawr6swjKuAWuEZaT8aIPwn6lLDkyVOtK_AyZ1G4W9RijfrZ6dAsolOsgJndxnCRSplqdU3bfVr6H71JaGHv5txMmFabG33EXPhy_SUyqvKMjE8xgqvV31Ayslr3Yy_nhL16kkU73vaEiQ3CokTa08388W4a7DnbXZLFkqDrZPwSId6R8RbjmOMDk6VMe4SW9jQuMGSop8j5RDXLVxekWM1hUarww6djiqu6kPxQPBXBjWrD7WOIu-Y6a45nVZsIqpA9cEz80JAeqgeP_Mm03S1Y6Uom_WX0AzND5uG3NZ3UUmumZircPUn0IfRrzkEXs7VXXcKf91fDm2J_S9qoNK5KU-jcq-gjcR2w3s5JkPh1P-gVRIShMibmwK5Ui2SaD4DgCZgTMbnqucjZifEaCFWhXnfWQZML8kFZAjVIPSvRylge7FKxW0I256pKfYWJjSQpK"
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