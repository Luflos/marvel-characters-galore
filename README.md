# Marvel Characters Galore

An application that allows users to search for Marvel characters and save them into a profile for others to see. Users also have the ability to learn in depth about their favorite characters. From their origin, creators, and all the comics that they are featured in as well!

## User Stories
More and more Marvel characters are being added to the MCU (Marvel Cinematic Universe) and not all of them are well known.
* As a user, I want to know more about the origins of my favorite Marvel characters or ones I haven't heard about
* As a user, I want to add characters, comics, or authors that I find interesting to a list so I can reference them later
* As a user, I want more details about specific comics, authors, and series 


## Routes

| **HTTP Verb**| **URL** |  **Action**| **Description**
|------------|-------------|------------|------------|
| GET        | /      | Index (read)  | Homepage where users can login or signup
| GET         | users/profile       | Index (read) |  The users main profile page when they login
| GET          | users/profile/favorites      | show (read)   | The users favorites page where they can see a list of Marvel chracter, creators, events, series, or comics that they have favorited
| POST     | users/profile/favorites       | Create (create)      |  Creates users favorites and adds it to their favorites page
| GET     | users/profile/favorites/:id | Show (read)    | show the detrails about a favorite item by the specific id
| GET     | users/profile/favorites/edit/:id | Edit (read)    | Shows a form to edit certain favorites / rearrange them
| PUT     | users/profile/favorites/:id | Update (update)    | Updates the users favorites page
| DELETE | users/profile/favorites/:id       | Destroy (delete)      | deletes the saved favorite by the specific id
| GET     | /search | Show (read)   | Display the search page
| GET     | /search/results | Show (read)   | Display the search results
| POST     | /characters      | Create (create)      |  Create a Marvel character
| GET      | /characters/:id   | Show (read)  | Display the details page about a Marvel chracter by their id
| POST     | /comics      | Create (create)      |  Create a comics
| GET      | /comics/:id   | Show (read)  | Display the details page about a Marvel comic by their id
| POST     | /creators      | Create (create)      |  Create the creators
| GET      | /creators/:id   | Show (read)  | Display the details page about a creator by their id
| POST     | /series      | Create (create)      |  Create the series page
| GET      | /series/:id   | Show (read)  | Display the details page about a Marvel series by their id
| POST     | /events      | Create (create)      |  Create the events page
| GET      | /events/:id   | Show (read)  | Display the details page about a Marvel events by their id
| POST     | /stories      | Create (create)      |  Create the stories page
| GET      | /stories/:id   | Show (read)  | Display the details page about a Marvel stories by their id

## Tech used
* NodeJS
* Express
* Postgres
* Bootstrap
* Sequelize

## API
* Marvel Comic API

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

## MVP
* Homepage that allows users to signup / login
* Have a navbar which leads to a users profile, homepage, favorites, and logout
* User favorites page that displays their favorite chracter, creator, event, stories
* User able to search for chracters by name or creator
* Have detailed pages for characters, comics, and creators
* Clicking on a comic directs to the detailed page about the comics

## Stretch Goals
* Have the comics be able to flip front and back
* Use another API to display upcoming MCU films
