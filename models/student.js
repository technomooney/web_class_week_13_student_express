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
        //TODO make a check constraint to force starIDs to have a specific format.
        //let result = sequelize.query('ALTER TABLE Students ADD CONSTRAINT staridValidation check (starID LIKE \'[A-Z][A-Z][0-9][0-9][0-9][0-9][A-Z][A-Z])\')')

    })

    return Student
}