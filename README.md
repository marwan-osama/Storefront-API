
# Storefront API

A storefront RESTfulAPI provides products, orders, authorization, and cart functionality.


## Tech Stack

**database:** PostgreSQL

**Server:** Node, Express

**Testing:** jasmine, supertest



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB`

`TEST_DB`

`POSTGRES_PORT`

`POSTGRES_TEST_PORT` **(must be different from `POSTGRES_PORT`)**

`POSTGRES_HOST`

`POSTGRES_USER`

`POSTGRES_PASSWORD`

`HASHING_SALT_ROUNDS`

`HASHING_PEPPER`

`JWT_SECRET`

`ENV`


**Note** 

* `ENV` default value is "dev"



## Run locally

* First, add `.env` file with the requiered variables above.

* second, you will need to **create the database container with Docker**.

```bash
  docker-compose up
```

* Then you will need to **install the required npm packages** using the following command.

```bash 
  npm install
```

* after that you will need to run database migrations using the following command.

```bash 
  npx db-migrate up
```

* Finally, you can **run the server** using the following command.

```bash 
  npm start
```



## Ports

* database port can be *specified in environment variables*

* test database port can be *specified in environment variables*

* server port is (3000)



## Running Tests

To run tests, run the following command

```bash
  npm run test
```

