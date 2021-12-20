const { Verifier } = require("@pact-foundation/pact");
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { server, importData, repo } = require("../../src/provider.js")
//const path = require("path")

server.listen(5000, () => {
    //importData()
    console.log("Account API Service listening on http://localhost:5000")
  })

// Verify that the provider meets all consumer expectations
 describe("Account API Pact verification", () => {
    it("validates the expectations of Matching Service", () => {
        const opts = {
            provider: "account_provider",
            logLevel: "DEBUG",
            providerBaseUrl: "http://localhost:5000",
            requestFilter: (req, res, next) => {
                console.log(
                  "Middleware invoked before provider API - injecting Authorization token"
                )
                // e.g. ADD Bearer token
                token = "eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2MzkzODIxODEsImV4cCI6MTYzOTM4NTc4MSwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2MzkzODIxNzksImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiOEExODU2ODNFQjJGMEU3QzcwMDYyNThENjA2MkVCNUQiLCJpYXQiOjE2MzkzODIxODEsInNjb3BlIjpbIm9wZW5pZCIsImdhdGV3YXkiXX0.u7Qct2lzTYUi_W1ucpQFan9HpkGl8sFCvTxhV81FiFhVfQ960htF4w81uRSBQ2c0d6MHBiBw0IAP_-LIVtJ25TOUDZne-b2fyQs2xZ7M46wllDrVFR7yTOIZQ-kux-cX6WlTmuXb22ixtoh3tAGpK4REVhxOr3Qi156tOq-twT_JdvmV9eLwseY7VPoiUfLsv8hJc4Tkymy3v0MEJtH0UVm_tZc0J2a9baa1WgYjCQ9XNSiJ8GpN5zzKxLsuDj8X6raDe-fI3UD-m0T7eCUP0-tN3YorHljIsak-iEZBXmq8fnFK0NlRET8PoX9aZff5yeIvdHhmLthraKkC4NvEmT7pd3M9DfZK3T-cZEDhpNfy2IFJywgL_u2uY7u5H6mp18c8yC0z8_Y19GdvOaBeltgcDH_rSsTIH_gW7XLfuBzLQ57mvM6JJM_13rGbkvTXIrRqKZikMd7DoTrXfTX3eKDOsWaEDsPhMaHTu7J8A8l7oVKjYPqBt_iytbheqyKB"
                req.headers["authorization"] = `Bearer ${token}`
                next()
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