const connection = require("../connect")
const dotenv = require("dotenv")
dotenv.config()
const table = process.env.DB_TABLE

dotenv.config();

function getForMainPage() {
    const pool = connection.createPool();
        return new Promise((resolve,reject) => {
            pool.query(`SELECT id,title,description FROM '${table}' LIMIT = 12`,(err,result) => {
                    if(err) reject(err)
                    connection.endPool(pool)
                    resolve(result)
            })
        })                                                            
}

function loadSpecific(id) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`SELECT * FROM '${table}' WHERE id = ${id}`,(err,result) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(result)
        })
    })
}

function editPool(id,title,description,pros,cons) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query(`ALTER TABLE ${table} UPDATE title = '${title}', description = '${description}',pros = ${pros},cons = ${cons} WHERE id = ${id}`,(err,result) => {
            if(err) reject(err);
            connection.endPool(pool)
            resolve(result)
        })
    })
}

function updatePool(id,name,pros) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query(`ALTER TABLE ${table} UPDATE '${name}' = ${pros} WHERE id = ${id}`,(err))
    })
}

function deletePool(id) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`DELETE FROM ${table} WHERE id = ${id}`,(err,result) => {
            if(err) reject(err)
            connection.endPool(err);
            resolve(result)
        })
    })
}


module.exports = getForMainPage,loadSpecific,editPool,deletePool,updatePool