const express = require("express");
const axios = require('axios')
const { createHash } = require('crypto')
require('dotenv').config();
const router = express.Router()
const db = require("../models");

const options = {
  headers: {
    'Accept': 'application/json'
  }
}

const pubKey = process.env.MARVEL_PUBLIC_KEY
const privKey = process.env.MARVEL_PRIVATE_KEY
const ts = new Date().getTime()
const reqHash = createHash('md5').update(ts + privKey + pubKey).digest('hex')

router.get('/:creators_id', async (req, res) => {
  try {
    const url = (`http://gateway.marvel.com/v1/public/creators/${req.params.creators_id}?&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)
    
    const response = await axios.get(url, options)
    const creatorDetails = response.data.data.results
    const attribution = response.data.attributionText

    const comicUrl = (`http://gateway.marvel.com/v1/public/creators/${req.params.creators_id}/comics?formatType=comic&limit=8&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)

    const responseTwo = await axios.get(comicUrl,  options)
    const comicImg = responseTwo.data.data.results

    // console.log(creatorDetails)
    res.render('creators/details.ejs', {details: creatorDetails, comics: comicImg, attribution})

  } catch (err) {
    console.log(err)
  }
})

// POST - add a comic to the db
router.post('/', async (req, res) => {
  try {
    const [comic, wasCreated] = await db.comic.findOrCreate({
      where: {
        title: req.body.title,
        series: req.body.series,
        description: req.body.description,
        thumbnail: req.body.thumbnail
      }
    })
    await res.locals.currentUser.addComic(comic)
    // console.log(`comic ${comic.title} was created:${wasCreated}`)
    res.redirect('/comics')
  } catch (err) {
    console.log(err)
  }
})

// Show Users Favorite Comics
router.get('/', async (req, res) => {
    const comicArray = await res.locals.currentUser.getComics()
    res.render('comics/favorites.ejs', {comicArray})
})

router.delete('/', async (req, res) => {
  try {
    const deleteFav = await db.users_comics.findOne({
      where: {
        userId: res.locals.currentUser.id,
        comicId: req.body.comicId
      }
    })
    await deleteFav.destroy()
    res.redirect('/comics')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;