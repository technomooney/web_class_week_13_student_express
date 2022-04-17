module.exports = (sequelize, DataTypes) => {
    let Student = sequelize.define('Student', {
        name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        starID: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[A-Z]{2}\d{4}[A-Z]{2}$/
            }
        },
        present:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    // force specifies weather or not to drp the table
    // true = drop the table every time the app restarts, this is needed if the table schema changes.
    // false keeps the table
    Student.sync({force:false}).then(() => {
        console.log("Synced Student table")

    })

    return Student
}