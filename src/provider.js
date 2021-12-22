const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const Repository = require("./repository")
const { json } = require("body-parser")
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

server.use((req, res, next) => {
  const token = req.headers["authorization"] || ""
  if (token !== "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2NDAwOTQzNzgsImV4cCI6MTY0MDA5Nzk3OCwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2Mzk5ODI4MjIsImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiREJGRjlCOUQyRTkzMDc2MzJERkExOUVFNzc2MTIzMTciLCJzaWQiOiI2OTlGMTBEMUU4RjY0QjY5QTFCNTExODVFNzYyNThBQiIsImlhdCI6MTY0MDA5NDM3OCwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.ECHtROJoUrGbzI-7qmgMWkjqauaKNliBHxy6SQcx1j6Y2PtOltt1kLUcR-RI9sHSkEmqJSmaCi8ME2V47W-kLKWgWnYSmu_s4vvYOAKrIyzimdcNC5GiABT3GxB5-Cas3DM8sJTSdRHiizvVfqwBrQMHorYIBfV3Cq4SqcBgjxpxerVKQbhf6gUndct6Qct2QjcApbvI7YJG7qTt-dBuDlWLhKRzQHMd1oqeScgpB6FA2pqgFwDuggcBst07rNSBKo1FNk8gehgbgBEriIQ9WqZ9escHswSGP0ubFSEJo6agznZtrRUR0qMDRWjLwU6Rhf4q1c813C1rybhFH4h6eegwRR5k5y2XfFI-olHN7hlAXCNQN3sw5qtCZQjmwt8R_Xc85buDru7alG0xfRqLW6Ow9Q5XlA8QLgihE9mcLAUeqQih7H6bxmt2JIiehjXR_OYV1hefICTcA8BtmTkZhQ3YMdgj6pSYTQO3OwmqoEptctthWs5lBu_LYWePfVfn") {
    res.sendStatus(401).send()
  } else {
    next()
  }
})

const accountRepo = new Repository()

const importData = () => require("../data/accountApi.json");
    accountRepo.insert(importData)

const activityData = () =>  require("../data/post/accountUserActivityNotes.json")
const activityNoteResponse = () => require("../data/post/accountUserActivityResponse.json")    


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
    accountRepo,
    importData,
    activityNoteResponse,
    activityData
  }  