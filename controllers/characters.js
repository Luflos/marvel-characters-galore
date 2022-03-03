const express = require("express");
const axios = require('axios')
const { createHash } = require('crypto');
const db = require("../models");
require('dotenv').config();
const router = express.Router()

const options = {
  headers: {
    'Accept': 'application/json'
  }
}

const pubKey = process.env.MARVEL_PUBLIC_KEY
const privKey = process.env.MARVEL_PRIVATE_KEY
const ts = new Date().getTime()
const reqHash = createHash('md5').update(ts + privKey + pubKey).digest('hex')

router.get('/:characters_id', async (req, res) => {
  try {
    const url = (`http://gateway.marvel.com/v1/public/characters/${req.params.characters_id}?&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)
    
    const response = await axios.get(url, options)
    const charDetails = response.data.data.results
    const attribution = response.data.attributionText
    

    const comicUrl = (`http://gateway.marvel.com/v1/public/characters/${req.params.characters_id}/comics?formatType=comic&limit=8&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)

    const responseTwo = await axios.get(comicUrl,  options)
    const comicImg = responseTwo.data.data.results

    // console.log(charDetails)
    res.render('characters/details.ejs', {details: charDetails, comics: comicImg, attribution})


  } catch (err) {
    console.log(err)
  }
})

// POST - add a character to the db
router.post('/', async (req, res) => {
  try {
    const [character, wasCreated] = await db.character.findOrCreate({
      where: {
        name: req.body.name,
        description: req.body.description,
        thumbnail: req.body.thumbnail
      }
    })
    await res.locals.currentUser.addCharacter(character)
    console.log(`character ${character.name} was created:${wasCreated}`)
  } catch (err) {
    console.log(err)
  }
})

//show
router.get('/', async (req, res) => {
  try {
    const charArray = await res.locals.currentUser.getCharacters()
    res.render('characters/index.ejs', {charArray})
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;