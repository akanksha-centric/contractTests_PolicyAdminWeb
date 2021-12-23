const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { should, assert, expect } = require('chai');
const exp = require("constants")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"
const { Pact, Matchers } = require("@pact-foundation/pact")
const { eachLike,like, regex, string } = Matchers
const { createApiCall,postApiError, getAccount, getErrorAccount } = require("../../src/consumer")
const POST_BODY = require("../../data/post/accountUserActivityNotes.json");
const POST_EXPECTED_BODY = require("../../data/post/accountUserActivityResponse.json")
const { up } = require("cli-color/move");
const {response} = require("express");


describe("Account User Activity Notes consumer test", () => {
    const mockprovider = new Pact({
        consumer: "AccountAPI_UserActivityNotes_consumer",
        provider: "AccountAPI_UserActivityNotes_provider",
        log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        spec : 2,
        logLevel: LOG_LEVEL,

    })

    before(() => mockprovider.setup().then(opts => {
        process.env.API_HOST = `http://localhost:${opts.port}`
    })
    )

    afterEach(() => mockprovider.verify())

    describe("When a call is made to insert user activity note", () => {
        before(() => mockprovider.addInteraction({
            state: "a request to create a new activity note",
            uponReceiving: "a request to create a new activity note",
            withRequest: {
                method: "POST",
                path: "/v1/accounts/9404268316/user_activities/notes",
                body: POST_BODY,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer token" 
                  },
            },
            willRespondWith: {
                status: 200,
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: like(POST_EXPECTED_BODY)
            },
        })
    )
    it("creates a new user activity note", done => {
        const suggestedAccount = createApiCall("/v1/accounts/9404268316/user_activities/notes")
        expect(suggestedAccount).to.eventually.be.fulfilled.notify(done)
        })
    })
    describe("When a call is made to insert user activity note and user is not authorized ", () => {
        before(() => mockprovider.addInteraction({
            state: "When user is not authorized while adding activity account",
            uponReceiving: "post request without authentication token",
            withRequest: {
                method: "POST",
                path: "/v1/accounts/9404268316/user_activities/notes",
                body: POST_BODY,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    //Authorization: "Bearer token" 
                  },
            },
            willRespondWith: {
                status: 401,
            },
        })
    )
    it("returns a 401 unauthorized when call made to create user activity", () => {
        const suggestedAccount = postApiError("/v1/accounts/9404268316/user_activities/notes")
        expect(suggestedAccount).to.eventually.be.rejectedWith("Unauthorized")        
      })
    })
    after(() => mockprovider.finalize())
})