# Transfer Management API

This application provides a backend service to manage users and their transfers. The data is stored in a MongoDB database and exposes several endpoints to interact with the data.

## Tech Stack

- Typescript
- Node.js
- Express.js
- MongoDB as Database
- Swagger as API Documentation

## Getting Started

1. Make sure you have Node.js installed.
2. Clone this repository.
3. Install the project dependencies using `npm install`.
4. Run the development server using `npm start`.

## API Documentation

You can explore and interact with the API using Swagger UI. Here are the available endpoints:

- [API Server](https://week-10-andra113-production.up.railway.app/api)
- [Swagger UI](https://week-10-andra113-production.up.railway.app/api-docs)

## Endpoints

### Get All Users

- **Method:** GET
- **Endpoint:** `/api/users`
- **Description:** Get a list of all users.

### Register New User

- **Method:** POST
- **Endpoint:** `/api/register`
- **Description:** Register a new user.
- **Request Body:** [RegisterUser Schema](#registeruser)
- **Responses:**
  - 200: User created successfully.
  - 400: Bad request or validation error.
  - 409: Conflict (username already exists).

### Login User

- **Method:** POST
- **Endpoint:** `/api/login`
- **Description:** Login a user.
- **Request Body:** [LoginUser Schema](#loginuser)
- **Responses:**
  - 200: Login success.
  - 400: Bad request or validation error.
  - 401: Unauthorized (incorrect username or password).
  - 404: User not found.

### Get Transfer List

- **Method:** GET
- **Endpoint:** `/api/transfers`
- **Description:** Get a list of all transfers.
- **Security:** Bearer token required.

### Create New Transfer

- **Method:** POST
- **Endpoint:** `/api/transfers`
- **Description:** Create a new transfer.
- **Request Body:** [CreateTransfer Schema](#createtransfer)
- **Security:** Bearer token required.
- **Responses:**
  - 200: New transfer created successfully.
  - 400: Bad request or validation error.

### Edit Transfer Status

- **Method:** PATCH
- **Endpoint:** `/api/transfers/{transfersId}`
- **Description:** Edit the status of a transfer.
- **Request Body:** [PatchTransfer Schema](#patchtransfer)
- **Security:** Bearer token required.
- **Responses:**
  - 200: Transfer status edited successfully.

## Deployment

The project has been successfully deployed using Railway for the API Server and MongoDB Atlas for the database.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
