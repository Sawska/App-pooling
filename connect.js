const {Pool} = require("pg")
const dotenv = require("dotenv")

dotenv.config();


function createPool() {
    return new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB,
        password: process.env.DB_PASSWORD,
        port: DB_PORT
    });
}

function endPool(pool) {
    pool.end((err) => {
        if(err) console.log(`err occured ${err}`)
        console.log("Pool has been closed")
    })
}


module.exports = createPool,endPool;