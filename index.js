const express = require("express"); // import express
const app = express();    // create an express instance
const ejsLayouts = require("express-ejs-layouts");  // import ejs layouts
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js');
// const db = require("./models/index.js");
require('dotenv').config();
const db = require("./models/index.js");

app.set("view engine", "ejs");  // set the view engine to ejs
app.use(ejsLayouts);  // tell express we want to use layouts
app.use(cookieParser())
app.use(express.urlencoded({ extended: false })) // body parser (to make req.body work)
const PORT = process.env.PORT || 8000  // check for an env

// CUSTOM LOGIN MIDDLEWARE
app.use( async (req, res, next) => {
  if (req.cookies.userId) {
    // decrypting the incoming user id from the cookie
    const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
    // converting the decrypted id into a readable string
    const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
    // querying the db for the user with that id
    const user = await db.user.findByPk(decryptedIdString)
    // assigning the found user to res.locals.user in the routes, and user in the ejs
    res.locals.currentUser = user
  } else res.locals.currentUser = null
  next()  // move on to the next middleware
})

// Controllers
app.use('/users', require('./controllers/users.js'))
app.use('/search', require('./controllers/search'))
app.use('/characters', require('./controllers/characters'))
app.use('/comics', require('./controllers/comics'))


app.get ('/', (req, res) => {
  res.render('home.ejs')
})

app.get('*', (req, res) => {
  
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})