const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { should, assert, expect } = require('chai');
const exp = require("constants")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"
const { Pact, Matchers } = require("@pact-foundation/pact")
const { eachLike, regex, string } = Matchers
const {getRequestApi,getRequestApiError401, getAccount, getErrorAccount } = require("../../../src/consumer")
const { getAccountInfoResponse } = require("../../../src/getModels")
const { up } = require("cli-color/move");
const { response } = require("express");

let apipath="/v1/accounts/9348878860"
let apipathFor404="/v1/accounts/93488788"

describe("Account API consumer test", () => {
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

    describe("When a call is made to get account info for id 9348878860", () => {
        before(() => mockprovider.addInteraction({
            state: "When call made to get account info for id 9348878860",
            uponReceiving: "200 OK return account info for id 9348878860",
            withRequest: {
                method: "GET",
                path: apipath,
                headers: { Authorization: "Bearer token" },
            },
            willRespondWith: {
                status: 200,
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: getAccountInfoResponse,
            },
        })
    )
        it("It will return an account info with 200 response", done => {
            const suggestedAccount = getRequestApi(apipath,getAccountInfoResponse)
            expect(suggestedAccount).to.eventually.have.deep.property("accountId", 9348878860).notify(done)
        })
    })

    describe("When a call is made to get account info but account not exist", () => {
        before(() => mockprovider.addInteraction({
            state: "When call is made to get account info but account not exist",
            uponReceiving: "404 Not found ",
            withRequest: {
                method: "GET",
                path: apipathFor404,
                headers: { Authorization: "Bearer token" },
            },
            willRespondWith: {
                status: 404,
            },
        })
    )
        it("It will return a 404 Not Found when call made to get account info", done => {
            const suggestedAccount = getRequestApi(apipathFor404,getAccountInfoResponse)
            expect(suggestedAccount).to.eventually.be.a("null").notify(done)
        })
    })

    describe("When a call is made to get account info and user is not authorized", () => {
        before(() => mockprovider.addInteraction({
            state: "When call is made to get account info but user is not authorized",
            uponReceiving: "Unauthorized 401",
            withRequest: {
                method: "GET",
                path: apipath
            },
            willRespondWith: {
                status: 401,
            },
        })
    )
        it("It will return a 401 unauthorized response", () => {
            return expect(getRequestApiError401(apipath)).to.eventually.be.rejectedWith("Unauthorized")
        })
    })

    after(() => mockprovider.finalize())
})