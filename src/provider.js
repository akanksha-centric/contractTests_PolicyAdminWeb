const express = require("express")
const cors = require("cors")
//const bodyParser = require("body-parser")
const Repository = require("./repository")
//const { json } = require("body-parser")
const server = express()
server.use(cors())

//server.use(bodyParser.json())
//server.use(
 // bodyParser.urlencoded({
   // extended: true,
  //})
//)

server.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8")
  next()
})

server.use((req, res, next) => {
  const token = req.headers["authorization"] || ""
  if (token !== "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2NDAwNzkwNTAsImV4cCI6MTY0MDA4MjY1MCwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2Mzk5ODI4MjIsImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiOUZFNDlFMEE2MTlGRDg4QUM3MUY2NTZFQTEzMUM2RTYiLCJzaWQiOiI2OTlGMTBEMUU4RjY0QjY5QTFCNTExODVFNzYyNThBQiIsImlhdCI6MTY0MDA3OTA1MCwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.Eu1LtWOsx-3edf1ZUCEpa76P_3LwbplQDkzG_aGyF4lfYuH8lxcnmzS2c7c8k-nUwbSQpp6vYGW6i9UXnJA5Fx0xDPVG6Uiqhmmtr0EhpoJaKDJGFRwsln1plZ6XGPzpLD0e-43Mf3Rup92uT9KyikxLaHl2ZbUSpA3scz4chdWTvYnL-TlxNQZSOQEjcTCU_kzD3oQStWEcTd8mbeuUQJZpKTSjXZosK-klDoyHX0sr_DFw7X_OlTQ9K3g9f9Zeys6d8h6VpqlB82Wcs70PrrlHKddVNh9ys4bKk7kvuxFqMGQcP0W10QsMu1wocQUmYPr7CflcY0PqwrGf4LZ1XrvogaJyIEf-j7pOZTzoevYwKcYCh_Bg0zCSem11raqr1o2s7AlX-B_Tlu67yXX_syfl6Ei0Ep7RCoPii_FAk8t46jak5vtyLgjbXyyZuGoEZchwyunhn55JvisXCmf2fWIMQAionn8p6D4I0Xq8vwMhNye42HKKZDRsFst_Er8L") {
    res.sendStatus(401).send()
  } else {
    next()
  }
})

const accountRepo = new Repository()

const importData = () => require("../data/accountApi.json");
    accountRepo.insert(importData)

const activityData = () =>  require("../data/post/accountUserActivityNotes.json")
const activityNoteResponse = () => require("../../data/post/accountUserActivityResponse.json")    


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

//server.use((req, res, next) => {
  //req.body = activityData
  //req.header("Content-Type", "application/json; charset=utf-8")
  //next()
//})  

server.post("/v1/accounts/9404268316/contactDetails/user_activities/notes", (req, res) => {
  const note = req.body
  req.header("Content-Type", "application/json; charset=utf-8")
  //const note = req.body(activityData)
  //res.header("Content-Type", "application/json; charset=utf-8")
  //note.id = accountRepo.fetchAll().length
  //accountRepo.insert(note)
  res.statusCode(201)
  res.json(activityNoteResponse)
})

function create (req, res) {
   const product = req.body 
   const savedProduct = products.create(product) 
   res.statusCode = 201 
   res.json(savedProduct)
 }

//server.get("/v1/accounts/:id", (req, res) =>{
  //const res = accountRepo.getById(req.params.id)
  //const token = req.headers["authorization"] || ""
  //if (token !== "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2Mzk3Mzk5NTksImV4cCI6MTYzOTc0MzU1OSwiaXNzIjoiaHR0cDovL25lcHR1bmUuY21pcHJvZy5jb20vQ2VudHJhbEFwaUdhdGV3YXkvYXV0aG9yaXphdGlvbnNlcnZlci8iLCJhdWQiOiJnYXRld2F5IiwiY2xpZW50X2lkIjoiNUJCMEJEMzUxQjU0QUYyMzEyMjlBNTk4MUE2QjA5RTgiLCJzdWIiOiJpbnRyYXphY3MwMDEiLCJhdXRoX3RpbWUiOjE2Mzk3MjMxMzksImlkcCI6Imh0dHA6Ly9wcm90ZXVzLmNtaXByb2cuY29tL0FVdGhvcml6YXRpb25TZXJ2ZXIiLCJnaXZlbl9uYW1lIjoiQWthbmtzaGEiLCJmYW1pbHlfbmFtZSI6IlNoYXJtYSIsImVtYWlsIjoiIiwidW5pcXVlX25hbWUiOiIxZDA3MWVjMy0xNWZmLTRlM2YtOTRlNS03OTkxZDRmZjA0ZWYiLCJ1c2VyX3R5cGUiOiJFbXBsb3llZSIsInRpdGxlIjoiSVQgQ29udHJhY3QgRGV2ZWxvcGVyIiwiY29tcGFueSI6IkNlbnRyYWwgSW5zdXJhbmNlIENvbXBhbmllcyIsImRlcGFydG1lbnQiOiJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IChDb250cmFjdCBEZXZlbG9wZXIpIiwicm9sZSI6IlBMMDUxIiwianRpIjoiMUIxQjUzREQ5RkVCQjRBMUI1MEJFQTMyNzMzMUIyMTUiLCJzaWQiOiIyRDA4NzIwMENEQjI5REY0RTE1NTc3QjgxNDU0MTZDQSIsImlhdCI6MTYzOTczOTk1OSwic2NvcGUiOlsib3BlbmlkIiwiZ2F0ZXdheSJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.YggyGPDTFiaYhRKmkX1mYq3d6CHDFzICKZADJgxOQmZA0tNIuvfbkPpdrSHzoj_IVAhwzJ64T9slsTHfSZPKphn1uNNgaAvl61glbzQkk0ssZUR0RqnOaq6-sZDe4ThPVtBqJ6AY6fNkbJgMAk4UjSTc_DV11XOkftC60ljLKNJf_oBcdtvBxN2qxPykKR2hwqsnhy3bo6gi-snWqpk0Vwi8QfTfNiXfrPQ8cVr7S_Jy8c-BUPY7hUE02gFTxidVp0-v291sCahZaq9VLBO-GceLM8SbJh-0Mh07OqeR3f83jgr883U5zCplFor1IyBwbk-VaZABB_TjpjVh2lP1p9B93ZuPYxdhcqtt0s6JFBTQDIxYXRd-bOuWhd5TWM6H0dIoQPHA4GO6TUTxzo9cnnYqC4y0TKVpz3qyomq1husXejhJP9tHpk2RpVHSHrjEj_CTV4hnMAFiqYUhfkgRE6QgDWvHbZfzZFfTHqz_QUx-bNalQVa94o_C2AQjtd0t") {
   // res.sendStatus(401).send()
  //} else {
   // next()
  //}
//})  

//server.get("/v1/accounts/:id", (req, res) => {
  //res.json(importData)
//})

module.exports = {
    server,
    accountRepo,
    importData,
    activityNoteResponse,
    activityData
  }  