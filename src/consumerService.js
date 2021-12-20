const { server } = require("./consumer.js")

server.listen(8080, () => {
  console.log("Account Service listening on http://localhost:8080")
})  