const connection = require("../connect")
const dotenv = require("dotenv");
dotenv.config()


function getAllUserPools(userid) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`SELECT * FROM ${process.env.ITEMDB} WHERE userid = ${userid}`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
             resolve(response)
        })
    })
}


function getAllOptions(item_id) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`SELECT * FROM ${process.env.ITEM_OPTION_DB} WHERE item_id = ${item_id}`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

function updateHowMuchChoosed(item_id,option_name,id) {
        const pool = connection.createPool();
        return new Promise((resolve,reject) => {
            pool.query(`UPDATE  ${process.env.ITEM_OPTION_DB} SET howmuchchoosed = (SELECT howmuchchoosed FROM ${process.env.ITEM_OPTION_DB} WHERE item_id = ${item_id}  AND id = ${id}) + 1 WHERE item_id = ${item_id} AND id = ${id}`,(err,response) => {
                if(err) reject(err)
                connection.endPool(pool)
                resolve(true)
            })
        })
}

function updateTitle(previosName,name,userid,id) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`UPDATE ${process.env.ITEMDB}  SET name = '${name}' WHERE userid = ${userid} AND name = '${previosName}' AND id = ${id}`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        }) 
    })
}

function updateOptionName(previosName,option_name,item_id,id) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`UPDATE ${process.env.ITEM_OPTION_DB} SET option_name = '${option_name}' WHERE item_id = ${item_id} AND option_name = '${previosName}' AND id = ${id}`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

function deleteOption(item_id,id) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`DELETE FROM ${process.env.ITEM_OPTION_DB} WHERE item_id = ${item_id} AND id = ${id}`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

function deletePool(userid,id) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`DELETE FROM ${process.env.ITEM_OPTION_DB} WHERE ${process.env.ITEMDB}_id = ${id}; DELETE FROM ${process.env.ITEMDB} WHERE userid = ${userid} AND id = ${id}`)
    })
}


module.exports = {
    getAllUserPools,
    getAllOptions,
    updateHowMuchChoosed,
    updateTitle,
    updateOptionName,
    deleteOption,
    deletePool
}