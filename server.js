let express = require("express")

let api_routes = require('./routes/student-api')
// const {router} = require("express/lib/application");

// create webapp in memory
let app = express()

// handle JSON and convert data to JS
app.use(express.json())

app.use("/api", api_routes)

app.use(function (req,res,next){
    //respond with 404 if requested any other address

    res.status(404).send(`Directory \"${req.path}\" Not found. Check the URL please try again!`)
})

// general/generic error handling...

app.use(function (err,req,res,next) {
    console.error(err.stack)
    res.status(500).send("Server error!")
})
// start the sever
let server = app.listen(process.env.PORT || 3000, function () {
    console.log(`Express server running on port  ${server.address().port}`)
})