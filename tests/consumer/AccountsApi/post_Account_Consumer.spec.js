const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { should, assert, expect } = require('chai');
const exp = require("constants")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"
const { Pact, Matchers } = require("@pact-foundation/pact")
const { eachLike,like, regex, string } = Matchers
const {postRequestApi,postRequestApiError401, createAccountApiCall,postAccountApiError} = require("../../../src/consumer")
const { postAccountApiReqBody,postAccountApiResponse } = require("../../../src/getModels")
const { up } = require("cli-color/move");
const {response} = require("express");

let apipath="/v1/accounts"

describe("Create Account consumer test", () => {
    const mockprovider = new Pact({
        consumer: "AccountAPI_Post_consumer",
        provider: "AccountAPI_Post_provider",
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

    describe("When a call is made to create an account", () => {
        before(() => mockprovider.addInteraction({
            state: "When call is made to create an account",
            uponReceiving: "200 OK Account gets created",
            withRequest: {
                method: "POST",
                path: apipath,
                body: postAccountApiReqBody,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    Authorization: "Bearer token" 
                  },
            },
            willRespondWith: {
                status: 200,
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: like(postAccountApiResponse)
            },
        })
    )
    it("it will return new account gets created", done => {
        const suggestedAccount = postRequestApi(apipath,postAccountApiReqBody)
        expect(suggestedAccount).to.eventually.be.fulfilled.notify(done)
        })
    })


    describe("When a call is made to create account but user is not authorized ", () => {
        before(() => mockprovider.addInteraction({
            state: "When call is made to create account but user is not authorized",
            uponReceiving: "Unauthorized 401",
            withRequest: {
                method: "POST",
                path: apipath,
                body: postAccountApiReqBody,
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  },
            },
            willRespondWith: {
                status: 401,
            },
        })
    )
    it("returns a 401 unauthorized when call made to create new account", () => {
        return expect(postRequestApiError401(apipath,postAccountApiReqBody)).to.eventually.be.rejectedWith("Unauthorized")
      })
    })

    after(() => mockprovider.finalize())
})