const { server } = require("./provider.js")
//importData()

server.listen(5000, () => {
  console.log("Account API Service listening on http://localhost:5000")
})