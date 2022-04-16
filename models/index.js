let { Sequelize, DataTypes} = require("sequelize")


// heroku has the env var set to production, it will be the set to that when it exists.
// otherwise, it will be set to development. most systems dont have a NODE_ENV set so this is default unless running on heroku
let env = process.env.NODE_ENV || "development"

let config = require(__dirname+ "/../config.json")[env]

let db = {}

let sequelize

if (config.use_env_variable) {
    // running on heroku
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    // running locally for development.
    sequelize = new Sequelize(config)
}

let studentModel = require("./student")(sequelize,DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize  //info on how to connect to the DB
db.Sequelize = Sequelize  // reference to sequelize library

module.exports = db

