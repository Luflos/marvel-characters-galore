# Marvel Characters Galore

An application that allows users to search for Marvel characters and save them into a profile for others to see. Users also have the ability to learn in depth about their favorite characters. From their origin, creators, and all the comics that they are featured in as well!

## User Stories
More and more Marvel characters are being added to the MCU (Marvel Cinematic Universe) and not all of them are well known.
* As a user, I want to know more about the origins of my favorite Marvel characters or ones I haven't heard about
* As a user, I want to add characters, comics, or authors that I find interesting to a list so I can reference them later
* As a user, I want more details about specific comics, authors, and series 

## Deployment Link
<a href="https://marvel-characters-galore.herokuapp.com/">Marvel Characters Galore</a>

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

## API
*  <a href="https://developer.marvel.com/">Marvel Comic API</a>

## Wireframes
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

## ERD
![an ERD of my project](./ERD.drawio.png)

### Final Design
* Homepage
![Index](./public/img/framework/Homepage.jpg)
* User Profile Page
![Profile](./public/img/framework/profile.jpg)
* Search Page
![Search](./public/img/framework/Search.jpg)
* Characters Page
![Characters](./public/img/framework/characters.jpg)
* Comics Page
![Comics](./public/img/framework/comics.jpg)

## ** MVP **
- [x] Homepage that allows users to signup / login 
- [x] Have a navbar which leads to a users profile, homepage, favorites, and logout
- [x] User favorites page that displays their favorite chracter, creator, event, stories
- [x] User able to search for chracters by name or creator
- [x] Have detailed pages for characters, comics, and creators
- [x] Clicking on a comic directs to the detailed page about the comics

## Stretch Goals
* Have the comics be able to flip front and back
* Use another API to display upcoming MCU films
