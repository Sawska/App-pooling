const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const registerLogin = require("./registerLoginErr")
const dbOperationsUser = require("./dbOperations/dbOperationsUser")
const poolingOperations = require("./poolingOperations");
const session  = require("express-session")
const methodOverride = require('method-override')

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

app.use(methodOverride("_method"))

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  if(req.session.username == undefined) {
    res.render("main");
  }  else {
    const username = req.session.username
    const pools = await poolingOperations.getAll(req.session.userid)
   res.render("dashboard",{username,pools})
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
      req.session.userid = registerLogin.getId(username,email)
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
    req.session.userid = await dbOperationsUser.getUserId(req.session.username,email)
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


app.post("/createPool",async (req,res) => {
  const name = req.body.title
  const options = req.body["option[]"]
  const id = req.session.userid
  const item_id = await poolingOperations.createPool(name,options,id)
  const username = req.session.username
   res.render("created",{item_id,username})
})

app.delete("/deletePool/:id", async (req, res) => {
    const id = req.params.id;
    const userid = req.session.userid;

    await poolingOperations.deletePool(userid, id);
    res.redirect("/");
});


app.get("/view/:item_id", async (req, res) => {
  const item_id = req.params.item_id;
  const username = req.session.username
  const { poolObject, options } = await poolingOperations.getPoolProprties(item_id);
  res.render("pool", { title: poolObject.name, options, item_id,username });
});





app.post("/vote/:id",async (req,res) => {
  const item_id = req.params.id
  const selectedOption = req.body.vote.split(":")
  const option_name = selectedOption[0]
  const id = selectedOption[1]
  await poolingOperations.updateHowMuch(id,item_id,option_name)
  res.redirect("/")
})

app.get("/update/:item_id",async (req,res) => {
  const item_id = req.params.item_id;
  const userid = req.session.userid
  const username = req.session.username
  const { poolObject, options } = await poolingOperations.getPoolProprtiesProtected(item_id,userid);
    res.render("update",{ title: poolObject.name, options, item_id,username })  
})

app.post("/update/:item_id",async (req,res) => {
  const name = req.body.title
  const options = req.body["option[]"]
  const userid = req.session.userid
  const item_id = req.params.item_id

  await poolingOperations.updatePool(item_id,name,options,userid)


  res.redirect("/")

})




if (require.main === module) {
    app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
      console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    });
  }
  
  

module.exports = app
