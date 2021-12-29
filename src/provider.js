const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const Repository = require("./repository")
const { json } = require("body-parser")
const { configurationList } = require("./configurationManager")
const { getAccountInfoResponse,postUserActivityNotesReqBody,postUserActivityNotesResponse } = require("./getModels")
const server = express()
server.use(cors())

server.use(bodyParser.json())
server.use(
 bodyParser.urlencoded({
    extended: true,
  })
)

server.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8")
  next()
})

let bearerToken = configurationList.accountApiBearerToken
server.use((req, res, next) => {
  const token = req.headers["authorization"] || ""
  if (token !== bearerToken) {
    res.sendStatus(401).send()
  } else {
    next()
  }
})

const accountRepo = new Repository()
accountRepo.insert(getAccountInfoResponse)
server.get("/v1/accounts/:id", (req, res) => {
    const response = accountRepo.getById(req.params.id)
    if (response) {
      res.end(JSON.stringify(response))
    } else {
      res.status(404)
      res.send({message: 'Client not found!'})
      res.end()
    }
  })

//server.post("/v1/accounts/9404268316/user_activities/notes", (req, res) => {
  //const note = req.body
  //req.header("Content-Type", "application/json; charset=utf-8")
  //res.status(200)
  //res.json(activityNoteResponse)
//})

module.exports = {
    server,
    accountRepo
  }  