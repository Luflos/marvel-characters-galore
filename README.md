# Marvel Characters Galore

An application that allows users to search for Marvel characters, comics, and creators. They can add their favorites and save them into a profile for others to see. Users also have the ability to learn in depth about their favorite characters and all the comics that they are featured in as well!

## User Stories
More and more Marvel characters are being added to the MCU (Marvel Cinematic Universe) and not all of them are well known.
* As a user, I want to know more about the origins of my favorite Marvel characters or ones I haven't heard about
* As a user, I want to add characters, comics, or authors that I find interesting to a list so I can reference later
* As a user, I want more details about specific comics, and authors

## Deployment Link
<a href="https://marvel-characters-galore.herokuapp.com/">Marvel Characters Galore</a>

## Installation Instructions
- Fork and clone the code and run `npm i` 
  <details>
    <summary> NPM </summary>

    - axios
    - bcrypt
    - cookie
    - crypto
    - dotenv
    - ejs 
    - expres
    - express-ejs-layouts
    - method-override
    - pg
    - sequelize
    - sequelize-cli

  </details>

- Run `create database marvel_characters` (`createdb marvel_characters` on non WSL)
- Run `sequelize db:migrate` to create the tables
- Go to "https://developer.marvel.com/" to request API keys
- You will receive a Public and a Private API key. Both are needed.
- Create a `.env` file and copy the keys into the file.
- The file should look like:
```
SECRET=(whateverYouWantItToBe)
MARVEL_PUBLIC_KEY=(YourPublicApiKey)
MARVEL_PRIVATE_KEY=(YourPrivateApiKey)
PORT=(WhateverPortYouWant)
```

## Routes
| **HTTP Verb**| **URL** |  **Action**| **Description**
|------------|-------------|------------|------------|
| GET        | /      | Index (read)  | Homepage
| GET         | users/profile       | Index (read) |  The users main profile page when they login
| GET     | users/edit/:id | Edit (read)    | Shows a form to edit a users name
| PUT     | users/:id | Update (update)    | Updates the users name
| GET         | /characters      | Show (read) |  The users favorite characters
| DELETE | characters/:userId       | Destroy (delete)      | deletes the saved character by a users id
| GET         | /comics      | Show (read) |  The users favorite comics
| DELETE | comics/:userId       | Destroy (delete)      | deletes the saved comic by a users id
| GET         | /creators      | Show (read) |  The users favorite creators
| DELETE | creators/:userId       | Destroy (delete)      | deletes the saved creator by a users id
| GET     | /search | Show (read)   | Display the search page
| GET     | /search/results | Show (read)   | Display the search results
| POST     | /characters      | Create (create)      |  Adds a character to the database
| GET      | /characters/:id   | Show (read)  | Display the details page about a Marvel chracter by their id
| POST     | /comics      | Create (create)      |  Adds a comic to the database
| GET      | /comics/:id   | Show (read)  | Display the details page about a Marvel comic by their id
| POST     | /creators      | Create (create)      |  Adds a creator to the databse
| GET      | /creators/:id   | Show (read)  | Display the details page about a creator by their id


## Tech used
* NodeJS
* Express
* Postgres
* Bootstrap
* Sequelize
* Marvel Comic API

## API
*  <a href="https://developer.marvel.com/">Marvel Comic API</a>

## Wireframes / Planning
<details>
  <summary> Initial Planning </summary>

* Homepage

![Index](./wireframes/Index.jpg)

* User Profile Page

![Profile](./wireframes/Profile.jpg)

* User Favorites Page

![Faves](./wireframes/Faves.jpg)

* Search Page

![Search](./wireframes/Search.jpg)

* Search Results Page

![Search-Results](./wireframes/Search-Results.jpg)

* Characters Page

![Characters](./wireframes/Characters.jpg)

* Creator Page

![Creator](./wireframes/Creator.jpg)

* Comics Page

![Comics](./wireframes/Comics.jpg)

</details>

## ERD
![an ERD of my project](./ERD.drawio.png)

### Final Design

<details>
  <summary> Screenshots </summary>

 Homepage
![Index](./public/img/framework/Homepage.jpg)
 User Profile Page
![Profile](./public/img/framework/profile.jpg)
 Search Page
![Search](./public/img/framework/Search.jpg)
 Characters Page
![Characters](./public/img/framework/characters.jpg)
 Comics Page
![Comics](./public/img/framework/comics.jpg)

</details>

##  MVP 
- [x] Homepage that allows users to signup / login 
- [x] Have a navbar which leads to a users profile, homepage, favorites, and logout
- [x] User favorites page that displays their favorite characters, creators, and comics
- [x] User able to search for characters by name or creator
- [x] Have detailed pages for characters, comics, and creators
- [x] Clicking on a comic directs to the detailed page about the comics

## Stretch Goals
- [] Have the comics be able to flip front and back
- [] Use another API to display upcoming MCU films

## Code Highlights

```javascript
const options = {
  headers: {
    'Accept': 'application/json'
  }
}

const pubKey = process.env.MARVEL_PUBLIC_KEY
const privKey = process.env.MARVEL_PRIVATE_KEY
const ts = new Date().getTime()
const reqHash = createHash('md5').update(ts + privKey + pubKey).digest('hex')

router.get('/charresults', async (req, res) => {
  try {
    const url = (`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${req.query.searchMarvel}&limit=8&ts=${ts}&apikey=${pubKey}&hash=${reqHash}`)
    
    const response = await axios.get(url, options)
    const marvelChar = response.data.data.results
    const badData = response.data.data
    res.render('search/charresults.ejs', {details: marvelChar, badData})
```
    
```javascript
    Creators:
 <% for( let i=0; i < detail.creators.items.length; i++ ) { %>
   <% const url=detail.creators.items[i].resourceURI
      const lastSegment=url.split("/").pop() %>
     <a class = "text-decoration-none" href="/creators/<%= lastSegment%>">
       <%= detail.creators.items[i].name %>
       (<%=detail.creators.items[i].role%>)
       </a> 
       |<% } %>
```

## Reflection

It's crazy to me that just 6 weeks ago I knew almost nothing about coding but here I am now making a web app.
I struggled a lot with this project and although I'm not fully satisfied by how my app looks but I'm still proud of it.
I initially struggled a lot with the models and the various relationships. As I continued to work on the project those things started to click more but I definitely still need to review a lot more as well. 
I wanted to get to some of my stretch goals but I spent so much time just styling small things here and there that I never got to them.
I also couldn't really find a good free APIs to display upcoming Marvel movies/shows. I found one that I potentially wanted to use but they requested I provide my address and I wasn't fully comfortable with that.
I was honestly held back by the limits of the API. A lot of details aren't provided and a lot of images and descriptions are empty.
Overall, even though I struggled a lot I still had fun making this project.

## Resources 
- Data provided by Marvel. © 2022 MARVEL
- https://giphy.com/ 
- https://bootswatch.com/superhero/
- https://getbootstrap.com/docs/5.1/getting-started/introduction/

