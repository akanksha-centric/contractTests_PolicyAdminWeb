const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { should, assert, expect } = require('chai');
const exp = require("constants")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"
const { Pact, Matchers } = require("@pact-foundation/pact")
const { eachLike,like, regex, string } = Matchers
const {getRequestApi,getRequestApiError401, getAccount, getErrorAccount } = require("../../../src/consumer")
const { getAccountContactDetailsResponse } = require("../../../src/getModels")
const { configurationList,saveConfiguration } = require("../../../src/configurationManager")
const { up } = require("cli-color/move");
const { response } = require("express");
const { merge } = require("superagent");
const { Console } = require("console");

//Define all constant
let apipath="/v1/accounts/9348878860/contactDetails"

describe("Account Contact Details Api consumer test", () => {
    const mockprovider = new Pact({
        consumer: "AccountAPI_consumer_contact",
        provider: "AccountAPI_provider_contact",
        log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        spec : 2,
        logLevel: LOG_LEVEL,
        cors: true,
        pactfileWriteMode: "merge"
    })

    before(() => mockprovider.setup().then(opts => {
        process.env.API_HOST = `http://localhost:${opts.port}`
    })
    )

    afterEach(() => mockprovider.verify())

    describe("When a call is made to get contact details with id 9348878860", () => {
        before(() => mockprovider.addInteraction({
            state: "When call made to get account contact details for id 9348878860",
            uponReceiving: "200 OK return account contact details",
            withRequest: {
                method: "GET",
                path: apipath,
                headers: { Authorization: "Bearer token" },
            },
            willRespondWith: {
                status: 200,
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: getAccountContactDetailsResponse,
            },
        })
    )
        it("It will return an account contact details with 200 response", done => {
            const suggestedAccount = getRequestApi(apipath,getAccountContactDetailsResponse)
            expect(suggestedAccount).to.eventually.have.deep.property("emails[0].emailAddress","hgfh@ytuy.com")
            .notify(done)
        })
    })

    describe("When a call is made to get account contact details and user is not authorized", () => {
        before(() => mockprovider.addInteraction({
            state: "When call is made to get account contact details but user is not authorized",
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