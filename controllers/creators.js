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
    const urlToMarvel = response.data.data

    const comicUrl = (`http://gateway.marvel.com/v1/public/creators/${req.params.creators_id}/comics?formatType=comic&limit=8&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)

    const responseTwo = await axios.get(comicUrl,  options)
    const comicImg = responseTwo.data.data.results

    // console.log(response.data.data.results[0].urls[0].url)
    res.render('creators/details.ejs', {details: creatorDetails, comics: comicImg, attribution, urlToMarvel})

  } catch (err) {
    console.log(err)
  }
})

// POST - add a creator to the db
router.post('/', async (req, res) => {
  try {
    const [creator, wasCreated] = await db.creator.findOrCreate({
      where: {
        name: req.body.name,
        comics: req.body.comics,
        series: req.body.series,
        stories: req.body.stories,
        events: req.body.events,
        thumbnail: req.body.thumbnail
      }
    })
    await res.locals.currentUser.addCreator(creator)
    // console.log(`comic ${comic.title} was created:${wasCreated}`)
    res.redirect('/creators')
  } catch (err) {
    console.log(err)
  }
})

// Show Users Favorite Comics
router.get('/', async (req, res) => {
    const creatorArray = await res.locals.currentUser.getCreators()
    res.render('creators/favorites.ejs', {creatorArray})
})

router.delete('/', async (req, res) => {
  try {
    const deleteFav = await db.users_creators.findOne({
      where: {
        userId: res.locals.currentUser.id,
        creatorId: req.body.creatorId
      }
    })
    await deleteFav.destroy()
    res.redirect('/creators')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;