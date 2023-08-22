const hashPassword = require("./hashPassword")
const dbOperationsUser = require("./dbOperations/dbOperationsUser")

async function checkRegister(password,repeatPassword,email) {
    const errText = []
    let isPassed = true

    if(password != repeatPassword) 
    {
      errText.push("Passwords are not the same")
      isPassed = false
    }

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


    if (!emailRegex.test(email)) {
        errText.push("Not valid email");
        isPassed = false;
      } else {
        const result = await checkIfEmailIsUsed(email);
        if (result) {
          errText.push("Email already used");
          isPassed = false;
        }
      }

    return {isPassed,errText}
}

async function checkIfEmailIsUsed(email) {
    const result = await dbOperationsUser.checkIfEmailIsAlreadyUsed(email)
    const res = result.rows
    

    return res.length == 1 ? true:false
}

async function registerUser(username,password,email) {
    return await dbOperationsUser.registerUser(username,password,email)
}

async function checkLogin(email,password) {
    let errText = []
    let isPassed = true
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if(emailRegex.test(email))  {
        const result = await checkIfEmailIsUsed(email) 
        if(!result) {
            errText.push("Email or password is wrong")
            isPassed = false;
        } else {
          const response= await dbOperationsUser.getUserPassword(email)
          const hashedPassword = response.rows[0].password
    
          const result = await hashPassword.compare(password,hashedPassword)

    if(!result) {
        errText.push("Email or password is wrong")
        isPassed = false
    }
        } 
    } else {
        errText.push("Email or password is wrong");
        isPassed = false;
    }
    
    return {isPassed,errText}
}



module.exports = {
    checkRegister,
    registerUser,
    checkLogin
  };
  