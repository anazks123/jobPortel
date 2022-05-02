const adminModel = require("../models/admin")
const bcrypt = require("bcrypt")

module.exports = async function (req, res, next) {
    try {
        const adminExist = await adminModel.findOne();
        if (!adminExist) {
            let newAdmin = {
                email: "admin@gmail.com",
                role: "admin"
            }
            newAdmin.encryptedPassword = await bcrypt.hash("1234", 10)
            await adminModel.create(newAdmin)
            console.log("created admin");
        }
        next();
    } catch (error) {
        res.status(500).send("DB Error...." + error)
    }
}