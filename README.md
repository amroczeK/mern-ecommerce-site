# Ecommerce Website

> eCommerce platform built with the MERN stack & Redux.

Learnt how to develop an eCommerce platform using the MERN stack & Redux by following Brad Traversy's fantastic [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) course. Made some forks & pull requests to his master branch along the way to optimize code and fix potential errors other people will run into.

## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 3001
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
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
```
