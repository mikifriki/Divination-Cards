# [Path of Exile divination cards API](https://divination-cards.herokuapp.com/)
![Image](https://i.imgur.com/OXFjISA.png)
### Short intro
This is an API I made with node for getting all the data of current Path of Exile divination cards
into one convenient place without extra fluff and to show off the beautiful art style of the cards.
The front-end of this is made with React.js

# Install dependencies for server and client with
```
npm install
npm run client-install respectively
```

# Start project with
To start the server and client use:
>npm run start-all

To start both in Development mode run:
>npm run start dev

# API endpoints
By default the linked website leads to the front-end I built with with React so showcase the Api.

Going to [/api/cards/all](https://divination-cards.herokuapp.com/api/cards/all) shows all the cards that are currently in the API.

Going to [/api/cards](https://divination-cards.herokuapp.com/api/cards) shows the first 20 cards by default.
Changing it to [/api/cards?page=1&size=12](https://divination-cards.herokuapp.com/api/cards?page=1&size=12) paginates the data and allows you to change how many items are shown per page.

And to go to a specific card id there is /api/cards/:id (replace :id with desired number)
## Built With

* [Node.js](https://nodejs.org/en/) - Used as the base for the server.
* [React.js](https://reactjs.org/) - Used for the front-end of this project.
* [Express.js](https://expressjs.com/) - Used for the api portion.
* [Cheerio.js](https://cheerio.js.org/) - For data scraping from websites.
* [lowdb](https://github.com/typicode/lowdb) - Used for a JSON based database.
* And some other minor dependencies.
