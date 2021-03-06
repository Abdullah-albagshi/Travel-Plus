# Udacity Front End Development Nonodegree 

## Travel Plus


## About the Project

In most cases of personal projects, it is very common to pull basic data from an external API. This is what we have accomplished so far in this nanodegree. However, many production-level applications do not rely on only a single source of data, they usually pull multiple data from various resources and make them available to different parts of the app asynchronously, so one API can use the data gathered from another API.

## API(s) Used

* [Geonames API](http://www.geonames.org/export/web-services.html) - Geographical database from which the location data is pulled
* [WeatherBit API](https://www.weatherbit.io/) - Weather API for current and future weather data
* [Pixabay API](https://pixabay.com/api/docs/) - RESTful interface for searching and retrieving free images and videos

* [Country API](https://restcountries.eu/) - RESTful Api for countries names and details

## Development strategy

1. Setup Webpack Development Enviroment: For this, I have created a gist to follow along.
2. Setup a form where users can enter the trip destination and the dates
3. Pull data including lattitude, longtitude and country code from Geonames API using user input
4. Pass this data to Weatther API along with user entered dates to obtain weather information
5. Introduce a countdown to find out how many days to the trip
6. Use country code to pull country name and national flag usin REST Countries API
7. Use location and country name to pull images from Pixabay API

## Getting Started

1. Download or clone the project:

2. Install dependencies
```
npm install
```
3. Start the server
```
npm start
```
4. Setup the environment development or production
```
npm run build-dev
```
* or 
```
npm run build
```
5. Test with Jest
```
npm run test
```

## Environment variables

* You need first to rename the file located at `src/server/config`
    from `config.env.env`   ->   `config.env`

* Then you need to replace the sample API keys with real once

## Built With

* [Bootstrap](https://getbootstrap.com/) - The CSS framework used 
* [Sass](https://sass-lang.com/documentation) - The web framework used
* [Webpack](https://webpack.js.org/concepts/) - Asset Management
* [Babel](https://babeljs.io/) - JavaScript Compiler
* [Node.js](https://nodejs.org/en/) - JavaScript Runtime
* [Express.js](https://expressjs.com/) - Server Framework for Node.js
* [Jest](https://jestjs.io/) - Testing suit
* [Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers) - For offline capability

## Test

To test the application, run
```
npm run test
```

# Application Hosted

This project already has been hosted using heroku at : https://travel--plus.herokuapp.com
