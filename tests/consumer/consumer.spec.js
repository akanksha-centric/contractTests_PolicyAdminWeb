const path = require("path")
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { should, assert, expect } = require('chai');
const exp = require("constants")
const LOG_LEVEL = process.env.LOG_LEVEL || "WARN"
const { Pact, Matchers } = require("@pact-foundation/pact")
const { eachLike,like, regex, string } = Matchers
const {getRequestApi,getRequestApiError401, postRequestApi, postRequestApiError401 } = require("../../src/consumer")
const { getAccountContactDetailsResponse } = require("../../src/getModels")
const { testCaseList,configurationList,saveConfiguration } = require("../../src/configurationManager")
const { allTestCases,accountApiTestCases } = require("../../src/testCasesObject")                                         
const { up } = require("cli-color/move");
const { response } = require("express");
const { merge } = require("superagent");
const { Console } = require("console");

//Get all test cases
const allTestCase=accountApiTestCases

// all_testcase.forEach(element => {
//     console.log(element.states)
// });
allTestCase.forEach(element => {
    element.testCases.forEach(subElement => {
describe("Account Contact Details Api consumer test", () => {
    const mockprovider = new Pact({
        consumer: element.consumer,//"AccountAPI_consumer_contact",
        provider: element.provider,//"AccountAPI_provider_contact",
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
        //allTestCase.forEach(element => {
            
        if(subElement.expactedResponse==200 && element.methodType=="GET")
        {
            describe(subElement.states, () => {
                before(() => mockprovider.addInteraction({
                    state: subElement.states,
                    uponReceiving: subElement.uponreceiving,
                    withRequest: {
                        method: element.methodType,
                        path: element.apiPath,
                        headers: { Authorization: "Bearer token" },
                    },
                    willRespondWith: {
                        status: subElement.expactedResponse,
                        headers: {"Content-Type": "application/json; charset=utf-8"},
                        body: element.reqBody,
                    },
                })
                )
                it(subElement.uponreceiving, done => {
                    const suggestedAccount = getRequestApi(element.apiPath,element.reqBody)
                    expect(suggestedAccount).to.eventually.be.fulfilled.notify(done)
                    //expect(suggestedAccount).to.eventually.have.deep.property(element.propertyToCompare,element.valueToCompare)
                    //.notify(done)
                })
            })
        }
        else if(subElement.expactedResponse==200 && element.methodType=="POST")
        {
            describe(subElement.states, () => {
                before(() => mockprovider.addInteraction({
                    state: subElement.states,
                    uponReceiving: subElement.uponreceiving,
                    withRequest: {
                        method: element.methodType,
                        path: element.apiPath,
                        body: element.reqBody,
                        headers: {
                                    "Content-Type": "application/json; charset=utf-8",
                                     Authorization: "Bearer token" 
                        },
                    },
                    willRespondWith: {
                        status: subElement.expactedResponse,
                        headers: {"Content-Type": "application/json; charset=utf-8"},
                        body: like(element.resBody),
                    },
                })
                )
                it(subElement.uponreceiving, done => {
                    const suggestedAccount = postRequestApi(element.apiPath,element.reqBody)
                    expect(suggestedAccount).to.eventually.be.fulfilled.notify(done)
                })
            })
        }
        else if(subElement.expactedResponse==401 && element.methodType=="POST")
        {
            describe(subElement.states, () => {
                before(() => mockprovider.addInteraction({
                    state:subElement.states ,  
                    uponReceiving: subElement.uponreceiving,
                    withRequest: {
                        method: element.methodType,
                        path: element.apiPath,
                        body: element.reqBody,
                        headers: {
                                    "Content-Type": "application/json; charset=utf-8"
                        },
                    },
                    willRespondWith: {
                        status: subElement.expactedResponse,
                    },
                })
            )
                it(subElement.uponreceiving, () => {
                    return expect(postRequestApiError401(element.apiPath,element.reqBody)).to.eventually.be.rejectedWith("Unauthorized")
                })
            })
        }
        else if(subElement.expactedResponse==401 && element.methodType=="GET")
        {
            describe(subElement.states, () => {
                before(() => mockprovider.addInteraction({
                    state:subElement.states ,  
                    uponReceiving: subElement.uponreceiving,
                    withRequest: {
                        method: element.methodType,
                        path: element.apiPath,
                        //headers: { Authorization: "Bearer token" },
                    },
                    willRespondWith: {
                        status: subElement.expactedResponse,
                    },
                })
            )
                it(subElement.uponreceiving, () => {
                    return expect(getRequestApiError401(element.apiPath)).to.eventually.be.rejectedWith("Unauthorized")
                })
            })
        }
        else if(subElement.expactedResponse==404 && element.methodType=="GET")
        {
            describe(subElement.states, () => {
                before(() => mockprovider.addInteraction({
                    state:subElement.states ,  
                    uponReceiving: subElement.uponreceiving,
                    withRequest: {
                        method: element.methodType,
                        path: subElement.apiPathNotFound,
                        headers: { Authorization: "Bearer token" },
                    },
                    willRespondWith: {
                        status: subElement.expactedResponse,
                    },
                })
            )
                it(subElement.uponreceiving, done => {
                    const suggestedAccount = getRequestApi(subElement.apiPathNotFound,element.reqBody)
                    expect(suggestedAccount).to.eventually.be.a("null").notify(done)
                })
            })
        }
    
after(() => mockprovider.finalize())
});
})
})