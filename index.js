const express = require("express"); // import express
const app = express();    // create an express instance
const ejsLayouts = require("express-ejs-layouts");  // import ejs layouts
const axios = require('axios')
require('dotenv').config();

app.set("view engine", "ejs");  // set the view engine to ejs
app.use(ejsLayouts);  // tell express we want to use layouts
app.use(express.urlencoded({ extended: false })) // body parser (to make req.body work)
const PORT = process.env.PORT || 8000  // check for an env

const pubKey = process.env.MARVEL_PUBLIC_KEY

app.get ('/', (req, res) => {
  res.render('home.ejs')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})