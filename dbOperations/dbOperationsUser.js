const connection = require("../connect")
const dotenv = require("dotenv");
dotenv.config()
const table = process.env.DB_TABLE_USER


function checkIfEmailIsAlreadyUsed(email) {
    const pool = connection.createPoolUser();

    return new Promise((resolve,reject) => {
        pool.query(`SELECT email FROM '${table}' WHERE email = '${email}'`,(err,response) => {
            if(err) reject(err)
            connection.endPool()
            resolve(response)
        })
    })
}
function registerUser(username,password,email) {
    const pool = connection.createPoolUser()

    return new Promise((resolve,reject) => {
        pool.query(`INSERT INTO '${table}' (username,password,email) VALUES('${username}','${password}','${email}')`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool);
            resolve(response)
        })
    })

}

function getUserPassword(email) {
    const pool = connection.createPoolUser();

    return new Promise((resolve,reject) => {
        pool.query(`SELECT password FROM '${table}' WHERE email = '${email}'`,(err,response) => {
            if(err) reject(err)
            connection.endPool()
            resolve(response)
        })
    })
}



module.exports = {
    checkIfEmailIsAlreadyUsed,
    registerUser,
    getUserPassword
}