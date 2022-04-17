let express = require("express")
let db = require("../models")
let Student = db.Student

let router = express.Router()


router.get("/students", function (req,res,next) {
    // did this before setting up heroku app. looked at the lab before starting....
    Student.findAll( {order:['present',
        db.Sequelize.fn('lower',db.Sequelize.col('name'))]}).then( students => {
        return res.json(students)
    }).catch(err => next(err))
})

router.post("/students", function (req,res,next) {
    Student.create(req.body).then( data => {
        return res.status(201).send("ok")
    }).catch(err => {
        // handal users, eg same starID, never seems to trigger...
        if ( err instanceof db.Sequelize.ValidationError ) {
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        }else {
            return next(err)
        }
    })
})

// edit student route
router.patch("/students/:id", function (req,res,next) {
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent, {where: {id:studentID}}).then( (rowsModified) => {
        let numberOfRowsModified = rowsModified[0]

        if (numberOfRowsModified === 1) {
            return res.send("ok")
        } else {
            //console.log(numberOfRowsModified)
            return res.status(404).json(['Not Found'])
        }
    }).catch(err => {
        // handal users, eg same starID
        if ( err instanceof db.Sequelize.ValidationError ) {
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
        }else {
            return next(err)
        }
    })
})

//  delete students route
router.delete("/students/:id", function (req,res,next) {
    let studentID = req.params.id

    Student.destroy({where: {id:studentID}})
        .then( (rowsDeleted) => {
            console.log(rowsDeleted)
            if (rowsDeleted === 1) {
                return res.send("ok")
            } else {
                return res.status(404).json(['Not Found'])
            }
        }).catch(err => next(err.errors))
})

module.exports = router