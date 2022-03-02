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

router.get('/', async (req, res) => {
  try {
    res.render('search/index.ejs')
  } catch (err) {
    console.log(err)
  }
})

router.get('/charresults', async (req, res) => {
  try {
    const url = (`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${req.query.searchMarvel}&limit=5&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)
    
    const response = await axios.get(url, options)
    const marvelChar = response.data.data.results
    // console.log(marvelChar)
    res.render('search/charresults.ejs', {details: marvelChar})

  } catch (err) {
    console.log(err)
  }
})

router.get('/comicresults', async (req, res) => {
  try {
    const url = (`http://gateway.marvel.com/v1/public/comics?titleStartsWith=${req.query.searchComics}&limit=5&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)
    
    const response = await axios.get(url, options)
    const marvelComics = response.data.data.results
    // console.log(marvelChar)
    res.render('search/comicresults.ejs', {comics: marvelComics})

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;