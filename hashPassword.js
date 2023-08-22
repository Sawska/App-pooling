const bcrypt = require("bcrypt")
const saltRound = 10;

function hash(password) {
    return new Promise((resolve,reject) => {
        bcrypt.hash(password,saltRound,(err,hashedPassword) => {
            if(err) reject(err);
            resolve(hashedPassword)
        })
    })
}

function compare(userProvidedPassword,storedHashedPassword) {
    return new Promise((resolve,reject) => {
        bcrypt.compare(userProvidedPassword,storedHashedPassword,(err,result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports =  {
    hash,
    compare
}