# Contact Management Application

A web application to manage contacts, allowing users to register, log in, and perform CRUD (Create, Read, Update, Delete) operations on their contact list. This application is built with Node.js, Express, MongoDB, and a front-end using HTML, CSS, and JavaScript.

## Features

- User Registration and Authentication
- JWT-based Authentication
- Add, Edit, Delete, and View Contacts
- Protected Routes and Operations
- Responsive UI

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Frontend**: HTML, CSS, JavaScript
- **HTTP Client**: Fetch API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- MongoDB installed and running locally or a cloud MongoDB instance

## Getting Started

### Installation

1. Clone the repository

    ```sh
    git clone https://github.com/your-username/contact-management-app.git
    cd contact-management-app
    ```

2. Install dependencies

    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following:

    ```env
    PORT=5001
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1. Start the server

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:5001`

## API Endpoints

### User Endpoints

- **Register User**

    ```http
    POST /api/users/register
    ```

    **Request Body**

    ```json
    {
        "username": "string",
        "email": "string",
        "password": "string"
    }
    ```

- **Login User**

    ```http
    POST /api/users/login
    ```

    **Request Body**

    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```

### Contact Endpoints

- **Get All Contacts**

    ```http
    GET /api/contacts
    ```

- **Create Contact**

    ```http
    POST /api/contacts
    ```

    **Request Body**

    ```json
    {
        "name": "string",
        "email": "string",
        "phone": "string"
    }
    ```

- **Update Contact**

    ```http
    PUT /api/contacts/:id
    ```

    **Request Body**

    ```json
    {
        "name": "string",
        "email": "string",
        "phone": "string"
    }
    ```

- **Delete Contact**

    ```http
    DELETE /api/contacts/:id
    ```

## Folder Structure

