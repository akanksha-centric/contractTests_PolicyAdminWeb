const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const Repository = require("../src/repository")
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

  if (token !== "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2Mzk2MzYxMjAsImV4cCI6MTYzOTYzOTcyMCwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2Mzk0ODQ4NDUsImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiMzY2M0QxNDExQjU4NURFMUZGMEQzM0UyRDI5OEM1NTQiLCJzaWQiOiI2ODA2RTQzRjRDRjA3ODAyQTExMjNCQzkwNzJDRjY0MSIsImlhdCI6MTYzOTYzNjEyMCwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.iTEWacPkeeY4vZSs5mhIC462_InKJFADeu7G-hdzO5PDJIeEmmKru9dE7tvsy2ayCHnQg0PeckxSYcz5R5FRXhbyrke5fghOOyMemR6sjZCraBz_pRHaR8vaSQsnKJzOaDymmd5Eb9EA2ssp32zDuVkhHuWENBQuPeV3Vylf0t5-ZXbCQsvMblHSo45ak-NRvOSmdJaQd5pQdzRZvD_l7n8aWHEk6gJshPjdWWbYFQM0XzC4AvUWiAuwz1TIqgEnz-2yMnA-RpMRhuylTPtb72TpHA7srQvoyXpLQF-6V87-GY2GhCamb3XpqAts7ilh6aWCbBRRUtvubqk3fwBk-DWMFYNb-sk1GTkFw7n44giQX1jbE-0uJvmMHUcZeNOf7TwsZT9W_RUb-nQ8ie2v4LSAzEVMUXCH9u992aGJjiEh_MiN5MFdFB9wmHELsCpDYpEclnq2c70SiF3f7rkpcwG5SnH66A1bDyW_C-6xvu8LtsO-W9NfElngaxhB4Yoj") {
    res.sendStatus(401).send()
  } else {
    next()
  }
})

const accountRepo = new Repository()

const importData = () => {
  const data = require("../data/accountApi.json")
  data.reduce((a, v) => {
    v.id = a + 1
    accountRepo.add(v)
    return a + 1
  }, 0)
}

//server.get("/v1/accounts/:id", (req, res) => {
  //res.json({id: 9348878860, agencyCode: "4218", accountStatus: "Open", version: "1.0.0"})
//})

server.get("/v1/accounts/:id", (req, res) => {
    const response = accountRepo.getById(req.params.id)
    if (response) {
      res.end(JSON.stringify(response))
    } else {
      res.writeHead(404)
      res.end()
    }
  })

module.exports = {
    server,
    accountRepo,
    importData
  }  