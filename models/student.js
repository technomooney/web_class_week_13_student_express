module.exports = (sequelize, DataTypes) => {
    let Student = sequelize.define('Student', {
        name: {
            type:DataTypes.STRING
        },
        starID: {
            type:DataTypes.STRING
        },
        present:{
            type:DataTypes.BOOLEAN
        }
    })

    // force specifies weather or not to drp the table
    // true = drop the table every time the app restarts, this is needed if the table schema changes.
    // false keeps the table
    Student.sync({force:true}).then(() => {
        console.log("Synced Student table")
    })

    return Student
}