const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.static("public"));

// Set the view engine to "ejs"
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Hi");
});

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Server is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});
