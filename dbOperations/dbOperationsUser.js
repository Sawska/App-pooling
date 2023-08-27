const connection = require("../connect")
const hashPassword = require("../hashPassword")
const dotenv = require("dotenv");
dotenv.config()
const table = process.env.DB_TABLE_USER


function checkIfEmailIsAlreadyUsed(email) {
    const pool = connection.createPool();

    return new Promise((resolve,reject) => {
        pool.query(`SELECT email FROM ${table} WHERE email = '${email}' LIMIT  1`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response)
        })
    })
}
async function registerUser(username,password,email) {
    const hashedPassword = await hashPassword.hash(password);
    const pool = connection.createPool()

    return new Promise((resolve,reject) => {
        pool.query(`INSERT INTO ${table} (username,password,email) VALUES('${username}','${hashedPassword}','${email}')`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool);
            resolve(true)
        })
    })

}

function getUserPassword(email) {
    const pool = connection.createPool();

    return new Promise((resolve,reject) => {
        pool.query(`SELECT password FROM ${table} WHERE email = '${email}'`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response)
        })
    })
}

function getUsername(email) {
    const pool = connection.createPool()

    return new Promise((resolve,reject) => {
        pool.query(`SELECT username FROM ${table} WHERE email = '${email}'`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows[0].username)
        })
    })
}

function getUserId(username,email) {
    const pool = connection.createPool()

    return new Promise((resolve,reject) => {
        pool.query(`SELECT id FROM ${table} WHERE email = '${email}' AND username = '${username}'`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows[0].id)
        })
    })
}



module.exports = {
    checkIfEmailIsAlreadyUsed,
    registerUser,
    getUserPassword,
    getUsername,
    getUserId
}