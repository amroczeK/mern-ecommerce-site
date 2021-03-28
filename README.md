# Ecommerce Website

> eCommerce platform built with the MERN stack & Redux.

Learned how to develop an eCommerce platform using the MERN stack & Redux by following Brad Traversy's fantastic [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) course.

My backend, RESTful API's, authentication and authorization methods are vastly different and follows the same flows and configurations from my previous projects. During development I noticed authentication/authorization issues in the course and made pull requests to Brad's master branch to optimize code and fix potential errors/issues that others may run into during the course.

![Alt text](./preview.png?raw=true 'Preview')

## Prerequisites
- Populate .env files
- Startup MongoDB Server or use Mongo Atlas
- Seed the data to MongoURI
```
npm run data:import
```
- 

## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 3001
MONGO_URI = your mongodb uri
JWT_ACCESS_TOKEN_SECRET = abc12345
JWT_ACCESS_TOKEN_EXPIRY = 300000
JWT_REFRESH_TOKEN_SECRET = ABC123456
JWT_REFRESH_TOKEN_EXPIRY = 86400000
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:3001)
npm run dev

# Run backend only
npm run server

# Run frontend only
cd .\frontend
npm start
```
