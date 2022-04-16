let express = require("express")

let api_routes = require('./routes/student-api')
const {router} = require("express/lib/application");

// create webapp in memory
let app = express()

// handle JSON and convert data to JS
app.use(express.json())

app.use("/api", api_routes)

// start the sever
let server = app.listen(process.env.PORT || 3000, function () {
    console.log(`Express server running on port ${server.address().port}`)
})