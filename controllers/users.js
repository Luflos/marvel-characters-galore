const express = require("express");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const cryptojs = require("crypto-js");
require('dotenv').config()

router.get('/profile', (req, res) => {
  res.render('users/profile.ejs')
})

router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

router.post("/", async (req, res) => {
  const [newUser, created] = await db.user.findOrCreate({
    where: { 
      email: req.body.email, 
      name: req.body.name
    }
  });
  if (!created) {
    console.log("User already exists");
    // render the login page and send an appropriate message
  } else {
    // hash the user
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.password = hashedPassword;
    await newUser.save();

    // encrypt the user id via AES
    const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET);
    const encryptedUserIdString = encryptedUserId.toString();
    // store the encrypted id in the cookie of the response object
    res.cookie("userId", encryptedUserIdString);
    // redirect back to the home page
    res.redirect("/");
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs", {error : null});
});

router.post("/login", async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.body.email }});
  if (!user) {
    // if it does not find user in database
    console.log("user not found");
    res.render("users/login.ejs", { error: "Invalid email/password" });
  } else if (!bcrypt.compareSync(req.body.password, user.password)) {
    // found user but wrong pw
    console.log("Incorrect Passwords");
    res.render("users/login.ejs", { error: "Invalid email/password" });
  } else { 
    console.log("logging in the user!");
    // encrypt the user id via AES
    const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET);
    const encryptedUserIdString = encryptedUserId.toString();
    // store the encrypted id in the cookie of the response object
    res.cookie("userId", encryptedUserIdString);
    // redirect back to the home page
    res.redirect("/users/profile");
  }
});

router.get("/logout", (req, res) => {
  console.log("logging out");
  res.clearCookie("userId");
  res.redirect("/");
});

// Edit users name
router.put("/:id", async (req, res) => {
  try {
    await db.user.update(
      {
        name: req.body.name
      },
      {
        where: {
          id: req.params.id
        },
      }
    );
    res.redirect("/users/profile");
  } catch (err) {
    console.log(err);
  }
});

// Users edit page
router.get("/edit/:id", (req, res) => {
  res.render("users/edit.ejs");
});



module.exports = router;
