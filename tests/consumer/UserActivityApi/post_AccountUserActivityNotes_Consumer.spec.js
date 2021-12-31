const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { should, assert, expect } = require('chai');
const exp = require("constants")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"
const { Pact, Matchers } = require("@pact-foundation/pact")
const { eachLike,like, regex, string } = Matchers
const {postRequestApi,postRequestApiError401, createApiCall,postApiError } = require("../../../src/consumer")
const { postUserActivityNotesReqBody,postUserActivityNotesResponse } = require("../../../src/getModels")
const { up } = require("cli-color/move");
const {response} = require("express");

let apipath="/v1/accounts/9404268316/user_activities/notes"

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

    describe("When a call is made to create a new user activity note", () => {
        before(() => mockprovider.addInteraction({
            state: "When call is made to create a new user activity note",
            uponReceiving: "200 OK Note created successfully",
            withRequest: {
                method: "POST",
                path: apipath,
                body: postUserActivityNotesReqBody,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer token" 
                  },
            },
            willRespondWith: {
                status: 200,
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: like(postUserActivityNotesResponse)
            },
        })
    )
    it("creates a new user activity note", done => {
        const suggestedAccount = postRequestApi(apipath,postUserActivityNotesReqBody)
        expect(suggestedAccount).to.eventually.be.fulfilled.notify(done)
        })
    })


    describe("When a call is made to insert an user activity note and user is not authorized ", () => {
        before(() => mockprovider.addInteraction({
            state: "When call is made to insert an user activity note and user is not authorized",
            uponReceiving: "Unauthorized 401",
            withRequest: {
                method: "POST",
                path: apipath,
                body: postUserActivityNotesReqBody,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  },
            },
            willRespondWith: {
                status: 401,
            },
        })
    )
    it("returns a 401 unauthorized when call made to create user activity", () => {
        return expect(postRequestApiError401(apipath,postUserActivityNotesReqBody)).to.eventually.be.rejectedWith("Unauthorized")
      })
    })

    after(() => mockprovider.finalize())
})