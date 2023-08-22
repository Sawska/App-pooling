const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const registerLogin = require("./registerLoginErr")
const app = express();

dotenv.config();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("main");
});

app.get("/createPool",(req,res) => {
    res.render("createPool")
})

app.get("/deletePool",(req,res) => {
    res.render("deletePool")
})

app.get("/demo",(req,res) => {
    res.render("demo")
})

app.get("/register",(req,res) => {
      let errText = []
      res.render("register",{errText})
})

app.get("/login",(req,res) => {
  const errText = []
  res.render("login",{errText})
})

app.post("/register",async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    const repeatPassword = req.body.repeatPassword
    const email = req.body.email

    let  {isPassed,errText} = await registerLogin.checkRegister(password,repeatPassword,email)


    if(isPassed)  {
      await registerLogin.registerUser(username,password,email)
      res.render("main")
    } else  {
      res.render("register",{errText})
    }

})

app.post("/login",async (req,res) => {
  const password = req.body.password
  const email = req.body.email

  let  {isPassed,errText} = await registerLogin.checkLogin(email,password)

  if(isPassed) {
    res.render("main")
  } else {
    res.render("login",{errText})
  }
})




if (require.main === module) {
    app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
      console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
  }
  
  

module.exports = app
