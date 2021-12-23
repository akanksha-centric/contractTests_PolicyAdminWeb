const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { server, accountRepo, activityData, activityNoteResponse } = require("../../src/provider.js")
//const activityData =  require("../data/post/accountUserActivityNotes.json")
//const activityNoteResponse = require("../../data/post/accountUserActivityResponse.json")
const path = require("path")

const SERVER_URL = "http://localhost:5000"

  server.listen(5000, () => {
     activityData()
     console.log(`Account API Contact Service listening on ${SERVER_URL}`)
   })

// Verify that the provider meets all consumer expectations
 describe("User activity of Notes API Pact verification", () => {
    it("validates the expectations of Matching Service", () => {
        let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2NDAyNTc0NDgsImV4cCI6MTY0MDI2MTA0OCwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2NDAxNjczMDMsImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiMzk5NEFDQzExRDhBM0Y5N0JCRTk1NEE3N0Q0RDBERDIiLCJzaWQiOiI0RjQ4MEM3MzlFQUE3OUVCQTE1MDExNEU1RUYyNTBGQiIsImlhdCI6MTY0MDI1NzQ0OCwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.uquLmnM8BwNYQVQI2qJ1wymwEyxq1W9MuTwU2iZeY1NwePG_rOkOa8cSXU0MF39fzDPTyIzpNKNb4hhAx04-KXtfeF9Y-xkxL0PPyRcH81RM4nI-8Oa-t28ifusef39HmLewcrSr07TpHENQSwcTiV0zUaXF6pkPXj8RW8aRLUZzfLAdqeCcWnRDCiJJfw5EsWotH77ZtbpbpHRx9WdU0uuZdIonyDoaznuE9YIxqn_ayQz0oSJHKJG_ngtjU1gSG0CN3K95hwSMfDztjJSIfnCWqRjVCVGictu1uWQbtsB0UJh4W9L7ZL932V7Bn-QmhvhahJs2M_BdN8U20m7R43TQAowHtpvOhY9PzE-nebOmmRcnb7Bvdk9m5MVjpTuAbyFcHfrCtQOV9ETr4eXUSiJ7LSdtpjorHlYVYZvAmDTEL2rcFMg_I_Qf2rkXKYLJqnBdcxvGOtq6x1SBerQia4Bo5SAD3uzcE6pPJSCSkP-gji_x8xVdcuCRbEW5z0gO"
        const opts = {
            provider: "AccountAPI_UserActivityNotes_provider",
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
                 "a request to create a new activity note": () => {
                    token
                    activityNoteResponse
                    return Promise.resolve(`New note is created`)
                 },
                 "When user is not authorized while adding activity account": () => {
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