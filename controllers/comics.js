const express = require("express");
const axios = require('axios')
const { createHash } = require('crypto')
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
    console.log(charDetails)
    res.render('characters/details.ejs', {details: charDetails, attribution})

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;