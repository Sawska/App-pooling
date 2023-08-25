const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const registerLogin = require("./registerLoginErr")
const dbOperationsUser = require("./dbOperations/dbOperationsUser")
const session  = require("express-session")
const app = express();

dotenv.config();

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true

}))

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())


app.set("view engine", "ejs");

app.get("/", (req, res) => {
  if(req.session.username == undefined) {
    res.render("main");
  }  else {
    const username = req.session.username
   res.render("dashboard",{username})
  }
});

app.get("/createPool",(req,res) => {
  const username = req.session.username || ""
    res.render("createPool", {username})
})



app.get("/demo",(req,res) => {
  const username = req.session.username || ""
    res.render("demo", {username})
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
      req.session.username = username
      req.session.email = email
      res.redirect("/")
    } else  {
      res.render("register",{errText})
    }

})

app.post("/login",async (req,res) => {
  const password = req.body.password
  const email = req.body.email

  let  {isPassed,errText} = await registerLogin.checkLogin(email,password)


  if(isPassed) {
    req.session.email = email
    req.session.username = await dbOperationsUser.getUsername(email)
    res.redirect("/")
  } else {
    res.render("login",{errText})
  }
})


app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect("/");
    }
  });
});





if (require.main === module) {
    app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
      console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
  }
  
  

module.exports = app
