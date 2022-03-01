const axios = require('axios')
const { createHash } = require('crypto')
require('dotenv').config();

const options = {
  headers: {
    'Accept': 'application/json'
  }
}

const pubKey = process.env.MARVEL_PUBLIC_KEY
const privKey = process.env.MARVEL_PRIVATE_KEY
const ts = new Date().getTime()
const reqHash = createHash('md5').update(ts + privKey + pubKey).digest('hex')
console.log(reqHash)

// const baseUrl = 'http://gateway.marvel.com/v1/public'

axios.get(`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${pubKey}&hash=${reqHash}`, options)
  .then(response => console.log(response.data))
  .catch(console.log)