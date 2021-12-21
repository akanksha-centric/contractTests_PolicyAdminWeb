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
        let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2NDAwNzkwNTAsImV4cCI6MTY0MDA4MjY1MCwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2Mzk5ODI4MjIsImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiOUZFNDlFMEE2MTlGRDg4QUM3MUY2NTZFQTEzMUM2RTYiLCJzaWQiOiI2OTlGMTBEMUU4RjY0QjY5QTFCNTExODVFNzYyNThBQiIsImlhdCI6MTY0MDA3OTA1MCwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.Eu1LtWOsx-3edf1ZUCEpa76P_3LwbplQDkzG_aGyF4lfYuH8lxcnmzS2c7c8k-nUwbSQpp6vYGW6i9UXnJA5Fx0xDPVG6Uiqhmmtr0EhpoJaKDJGFRwsln1plZ6XGPzpLD0e-43Mf3Rup92uT9KyikxLaHl2ZbUSpA3scz4chdWTvYnL-TlxNQZSOQEjcTCU_kzD3oQStWEcTd8mbeuUQJZpKTSjXZosK-klDoyHX0sr_DFw7X_OlTQ9K3g9f9Zeys6d8h6VpqlB82Wcs70PrrlHKddVNh9ys4bKk7kvuxFqMGQcP0W10QsMu1wocQUmYPr7CflcY0PqwrGf4LZ1XrvogaJyIEf-j7pOZTzoevYwKcYCh_Bg0zCSem11raqr1o2s7AlX-B_Tlu67yXX_syfl6Ei0Ep7RCoPii_FAk8t46jak5vtyLgjbXyyZuGoEZchwyunhn55JvisXCmf2fWIMQAionn8p6D4I0Xq8vwMhNye42HKKZDRsFst_Er8L"
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
                    activityData()
                    return Promise.resolve(`New note is created`)
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