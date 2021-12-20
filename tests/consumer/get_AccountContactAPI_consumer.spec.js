const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { should, assert, expect } = require('chai');
const exp = require("constants")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"
const { Pact, Matchers } = require("@pact-foundation/pact")
const { eachLike,like, regex, string } = Matchers
const { getAccount, getErrorAccount } = require("../../src/consumer")
const accountData = require("../../data/accountContactDetails.json");
const { up } = require("cli-color/move");
const { response } = require("express");


describe("Account Contact Details API consumer test", () => {
    const mockprovider = new Pact({
        consumer: "AccountAPI_consumer",
        provider: "AccountAPI_provider",
        log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        spec : 2,
        logLevel: LOG_LEVEL,
        cors: true
    })

    before(() => mockprovider.setup().then(opts => {
        process.env.API_HOST = `http://localhost:${opts.port}`
    })
    )

    afterEach(() => mockprovider.verify())

    describe("When a call is made to API for a particular account id 9348878860", () => {
        before(() => mockprovider.addInteraction({
            state: "Has an contact details with ID 9348878860",
            uponReceiving: "a request for an account with ID 9348878860",
            withRequest: {
                method: "GET",
                path: "/v1/accounts/9348878860/contactDetails",
                headers: { Authorization: "Bearer token" },
            },
            willRespondWith: {
                status: 200,
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: accountData,
            },
        })
    )
        it("It will return an account with 200 response", done => {
            const suggestedAccount = getAccount("/v1/accounts/9348878860/contactDetails")
            expect(suggestedAccount).to.eventually.have.deep.property("emails[0].emailAddress","hgfh@ytuy.com")
            .notify(done)
        })
    })

    describe("When a call is made to wrong account which is not present in database", () => {
        before(() => mockprovider.addInteraction({
            state: "When a call is made to wrong account",
            uponReceiving: "a request for invalid account",
            withRequest: {
                method: "GET",
                path: "/v1/accounts/93488788/contactDetails",
                headers: { Authorization: "Bearer token" },
            },
            willRespondWith: {
                status: 404,
            },
        })
    )
        it("It will return a 404 Not Found response", done => {
            const suggestedAccount = getAccount("/v1/accounts/93488788/contactDetails")
            expect(suggestedAccount).to.eventually.be.a("null").notify(done)
        })
    })

    describe("When a call is made to API for account 9348878860 and user is not authorized", () => {
        before(() => mockprovider.addInteraction({
            state: "When user is not authorized",
            uponReceiving: "a request without authentication token",
            withRequest: {
                method: "GET",
                path: "/v1/accounts/9348878860/contactDetails"
            },
            willRespondWith: {
                status: 401,
            },
        })
    )
        it("It will return a 401 unauthorized response", () => {
            return expect(getErrorAccount("/v1/accounts/9348878860/contactDetails")).to.eventually.be.rejectedWith("Unauthorized")
        })
    })

    after(() => mockprovider.finalize())
})