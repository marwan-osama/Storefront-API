
## API Reference

#### Products

* Get all products

```http
  GET /products
```


* Get product

```http
  GET /products/${id}
```

| Parameter | Type     |
| :-------- | :------- |
| `id`      | `string` |

* Create product (authorization token must be provided)

```http
  POST /products
```

| body queries    | Type     | Description  |
| :-------------- | :------- | :------------|
| `product_name`  | `string` | **Required** |
| `product_price` | `number` | **Required** |



#### Users

* Get all users (authorization token must be provided)

```http
  GET /users
```


* Get user (authorization token must be provided)

```http
  GET /users/${userid}
```

| Parameter | Type     |
| :-------- | :------- |
| `id`      | `string` |

* Create user (authorization token must be provided)

```http
  POST /users
```

| body queries  | Type     | Description  |
| :------------ | :------- | :----------- |
| `firstname`   | `string` | **Required** |
| `lastname`    | `string` | **Required** |
| `password`    | `string` | **Required** |



#### Orders

* Get order

```http
  GET /orders/${userid}
```

| Parameter | Type     | Description    |
| :-------- | :------- | :------------- |
| `userid`  | `string` | **Required**.  |

* add products to order (authorization token must be provided)

```http
  POST /orders/${userid}
```

| body queries  | Type     | Description    |
| :------------ | :------- | :------------- |
| `product_id`  | `string` | **Required**.  |
| `quantity`    | `number` | optional.      |



## Database schema

#### Products

* Products table
| columns | Type                 |
| :-----  | :------------------- |
| `id`    | `SERIAL PRIMARY KEY` |
| `name`  | `VARCHAR`            |
| `price` | `INT`                |

#### Users

* Users table
| columns           | Type                 |
| :-----            | :------------------- |
| `id`              | `SERIAL PRIMARY KEY` |
| `firstname`       | `VARCHAR`            |
| `lastname`        | `VARCHAR`            |
| `password_digest` | `VARCHAR`            |

#### Orders

* Orders table
| columns   | Type                 |
| :-----    | :------------------- |
| `id`      | `SERIAL PRIMARY KEY` |
| `user_id` | `INT`                |
| `status`  | `VARCHAR`            |


* Order products table
| columns      | Type                          |
| :-------     | :---------------------------- |
| `id`         | `SERIAL PRIMARY KEY`          |
| `order_id`   | `INT REFERENCES orders(id)`   |
| `product_id` | `INT REFERENCES products(id)` |
| `quantity`   | `INT`                         |