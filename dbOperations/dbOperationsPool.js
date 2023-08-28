const connection = require("../connect")
const dotenv = require("dotenv");
dotenv.config()


function getAllUserPools(userid) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`SELECT * FROM ${process.env.ITEMDB} WHERE userid = ${userid}`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
             resolve(response.rows)
        })
    })
}

function updateDateOfCreation(item_id,userid,dateOfCreation) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('UPDATE items SET "dateOfCreation" = \$1 WHERE id = \$2 AND userid = \$3',
        [dateOfCreation,item_id,userid],(err,respose) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
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

function updateHowMuchChoosed(item_id,id) {
        const pool = connection.createPool();
        return new Promise((resolve,reject) => {
            pool.query(
                `UPDATE ${process.env.ITEM_OPTION_DB}
                SET howmuchchoosed = (SELECT howmuchchoosed FROM ${process.env.ITEM_OPTION_DB} WHERE item_id = $1 AND id = $2) + 1
                WHERE item_id = $1 AND id = $2`,
                [item_id, id],(err,response) => {
                    if(err) reject(err)
                    connection.endPool(pool)
                    resolve(true)
                }
            );
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
        pool.query(`DELETE FROM "userChoosed" WHERE item_id = ${id}; DELETE FROM ${process.env.ITEM_OPTION_DB} WHERE item_id = ${id}; DELETE FROM ${process.env.ITEMDB} WHERE userid = ${userid} AND id = ${id};`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool);
            resolve(true)
        })
    })
}

function addPool(name, userid, dateOfCreation) {
    const pool = connection.createPool();
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO items (name, userid, "dateOfCreation") VALUES (\$1, \$2, \$3)', 
            [name, userid, dateOfCreation],
            (err, response) => {
                if(err) reject(err);
                connection.endPool(pool);
                resolve(true);
            }
        )
    })
}

function addPoolAnon(name,dateOfCreation) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query(
            'INSERT INTO items (name,"dateOfCreation") VALUES (\$1,\$2)',
            [name,dateOfCreation],
            (err,response) => {
                if(err) reject(err)
                connection.endPool(pool)
                resolve(true)
            }
        )
    })
}




function addOption(item_id,option_name,howmuch = 0) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query(`INSERT INTO item_options (item_id,option_name,howmuchchoosed) VALUES (${item_id},'${option_name}',${howmuch})`,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

function getIdOfPool(name,userid,dateOfCreation) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query('SELECT id FROM items WHERE name = \$1 AND userid = \$2 AND "dateOfCreation" = \$3',
        [name,userid,dateOfCreation],(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows[0].id)
        })
    })
}

function getIdOfPoolAnon(name,dateOfCreation) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('SELECT id FROM items WHERE name = \$1 AND "dateOfCreation" = \$2',
        [name,dateOfCreation]
        ,(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows[0].id)
        })
    })
}


function getPool(item_id) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM items WHERE id = \$1',
        [item_id],(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows[0])
        })
    })
}


function getPoolProtected(item_id,userid) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM items WHERE id = \$1 AND userid = \$2',
        [item_id,userid],(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows[0])
        })
    })
}

function getOption(item_id) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM item_options WHERE item_id = \$1',
        [item_id],(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows)
        })
    })
}

function getOptionProtected(item_id,userid) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM item_options WHERE item_id = \$1',
        [item_id],(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows)
        })
    })
}

function deleteAllOptions(item_id,userid) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('DELETE FROM item_options WHERE item_id = \$1',
        [item_id],(err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

function rememberVote(userid,item_id,option_id) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('INSERT INTO "userChoosed" (userid,item_id,option_id) VALUES(\$1,\$2,\$3)',
        [userid,item_id,option_id],
        (err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

function deleteUserVotes(item_id) {
    const pool = connection.createPool()
    return new Promise((resolve,reject) => {
        pool.query('DELETE FROM userChoosed WHERE item_id = \$1',
        [item_id],
        (err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

function seeIfUserVoted(item_id,userid) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query('SELECT option_id FROM "userChoosed" WHERE item_id = \$1 AND userid = \$2',
        [item_id,userid],
        (err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(response.rows)
        })
    })
}

function deleteVote(item_id,userid) {
    const pool = connection.createPool();
    return new Promise((resolve,reject) => {
        pool.query('DELETE FROM "userChoosed" WHERE item_id = \$1 AND userid = \$2',
        [item_id,userid], 
        (err,response) => {
            if(err) reject(err)
            connection.endPool(pool)
            resolve(true)
        })
    })
}

module.exports = {
    getAllUserPools,
    getAllOptions,
    updateHowMuchChoosed,
    updateTitle,
    updateOptionName,
    deleteOption,
    deletePool,
    addPool,
    addOption,
    getIdOfPool,
    getPool,
    getOption,
    getPoolProtected,
    getOptionProtected,
    deleteAllOptions,
    updateDateOfCreation,
    addPoolAnon,
    getIdOfPoolAnon,
    rememberVote,
    deleteUserVotes,
    seeIfUserVoted,
    deleteVote
}