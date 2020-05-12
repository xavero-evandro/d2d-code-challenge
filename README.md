# D2D Challenging Code

# Let's Start

Dependencies:

- node: 19 or higher and npm

# Local

## Frontend

Go to door2door-front folder and install all dependencies:

```
yarn install
```

and then start the server:

```bash
yarn start
```

Please check your browser `localhost:3000`

## Backend

Go to door2door-api folder install all dependencies:

### RECOMMENDED Approach

There is a docker compose file.
Run one command with docker and everything will be set up right:

```
docker-compose up -d
```

### Old Fashion way

```
npm install
```

and then to start the server:

```
npm start
```

or use watch:

```
npm run watch
```

Endpoints will be on localhost:3333

## DB

I've used MongoDB to makes thing easy and for the power of the storage. There are 2 collection one for the Vehicle itself and another for the location I've exposed also a end point in the back end that return all location and dates per Vehicle. `GET /vehicles/locations`

## Next Steps

To use the driver-simulator please go to https://github.com/door2door-io/d2d-code-challenges/tree/master/resources/driver-simulator

To run this simulator just run yarn start localhost:[Port] in my case:

```
yarn start localhost:3333
```

## Tech Chat

## Backend

Node.js with express for the backend. I also used MongoDB as a database to help me handler all the request and provide a fast solution.

## Frontend

I used React and Mapbox for map visualization. React is a nice and easy framework, also provide tons of libs to help us doing our jobs. Mapbox is the bes looking map navigation system on the market and have a lot of great features, unfortunately I tried to create a colorful line to show car's path, but I think the react lib that I was using doesn't support that.

## Tests

I've create integration and unit test for the API.
The test also wil provide a coverage report.
I didn't took time to do the test on the React part since is just a basic visualization.

To run the test on the backend go to the backend folder (door2door2-api) and run:

```
npm run test
```

## What is missing

So is missing maybe some basic test from the frontend, but I judged that as not needed right know.
I didn't deploy on AWS Heroku or Google cloud, it takes some more steps to do and I already provide a dockerized approache to the problem.

## Handling 100 vehicles

### For this example no clusters and no city boundaries

Please take a look in this image:
![](/image.jpeg)

## I also add a exported file to be imported on Insomnia

# Thanks and fell free to improve it
