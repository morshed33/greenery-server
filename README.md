# Greenery Backend Documentation

## Introduction

The backend for Greenery, handling all server-side operations, including product management, user data, and database interactions. Built with Express and MongoDB, this backend serves as the API layer for the frontend client, providing endpoints for product listings, filtering, and search functionalities.

## Features

- **Product Management**: CRUD operations for products (create, read, update, delete).
- **Category and Filter Support**: Backend supports filtering products by category, price, etc.
- **RESTful API**: Provides endpoints for the frontend to fetch product data, filter products, and search.
- **Mongoose Integration**: MongoDB as the database with Mongoose as the ODM.
- **Cors Enabled**: To handle cross-origin requests from the frontend.

## Technology Stack

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Fast and minimalist web framework for building the API.
- **MongoDB**: NoSQL database for storing products and user information.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Cors**: Middleware for handling Cross-Origin Resource Sharing.

## Installation Guideline

### Prerequisites

- **Node.js**: Make sure Node.js is installed. You can download it from [here](https://nodejs.org/en/).
- **MongoDB**: Install MongoDB or have access to a MongoDB database.

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/morshed33/greenery-server.git
   cd greenery-server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create an environment file**:

   In the root directory, create a `.env` file and add the following environment variables:

   ```bash
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

### Running the Application

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **API Endpoints**:

   The backend will be running at `http://localhost:5000/api`.  
   Available endpoints include:

   - **GET /products**: Fetch all products.
   - **POST /products**: Create a new product.
   - **GET /products/:id**: Fetch a specific product by ID.
   - **PUT /products/:id**: Update a product by ID.
   - **DELETE /products/:id**: Delete a product by ID.

## Usage

1. **Set up MongoDB**: Ensure your MongoDB instance is running and connected.
2. **Manage Products**: Use Postman or any API client to interact with the product endpoints.
3. **Filter and Search**: Use query parameters to filter and search for products in the API.

### Example API Requests

- **Fetch Products**:

   ```bash
   GET http://localhost:5000/api/products


   {
    "success": true,
    "statusCode": 200,
    "message": "Products retrieved successfully",
    "data": {
        "products": [
            {
                "_id": "66f64f5feff98473205eccd3",
                "title": "Terrarium Flower",
                "description": "A terrarium (pl.: terraria or terrariums) is a glass container containing soil and plants in an environment different to the surroundings. It is usually a sealable container that can be opened for maintenance or to access the plants inside; however, terraria can also be open to the atmosphere. Terraria are often kept as ornamental items.",
                "price": 6,
                "image": "https://images.pexels.com/photos/1542937/pexels-photo-1542937.jpeg?auto=compress&cs=tinysrgb&w=800",
                "category": "flower",
                "rating": 0,
                "quantity": 0,
                "createdAt": "2024-09-27T06:23:27.485Z",
                "updatedAt": "2024-09-27T06:23:27.485Z",
                "__v": 0
            },
            {
                "_id": "66f64ad2eff98473205ecb6e",
                "title": "Terrarium Flower",
                "description": "A terrarium (pl.: terraria or terrariums) is a glass container containing soil and plants in an environment different to the surroundings. It is usually a sealable container that can be opened for maintenance or to access the plants inside; however, terraria can also be open to the atmosphere. Terraria are often kept as ornamental items.",
                "price": 18554,
                "image": "https://images.pexels.com/photos/1542937/pexels-photo-1542937.jpeg?auto=compress&cs=tinysrgb&w=800",
                "category": "flower",
                "rating": 4,
                "quantity": 5440,
                "createdAt": "2024-09-27T06:04:02.347Z",
                "updatedAt": "2024-09-27T06:43:54.947Z",
                "__v": 0
            }
        ],
        "pagination": {
            "total": 11,
            "limit": 10,
            "page": 1
        }
    }

}

- **Create a Product**:

   ```bash
   POST http://localhost:5000/api/products
  {
    "success": true,
    "statusCode": 201,
    "message": "Product Created",
    "data": {
       {
                "_id": "66f64ad2eff98473205ecb6e",
                "title": "Terrarium Flower",
                "description": "A terrarium (pl.: terraria or terrariums) is a glass container containing soil and plants in an environment different to the surroundings. It is usually a sealable container that can be opened for maintenance or to access the plants inside; however, terraria can also be open to the atmosphere. Terraria are often kept as ornamental items.",
                "price": 18554,
                "image": "https://images.pexels.com/photos/1542937/pexels-photo-1542937.jpeg?auto=compress&cs=tinysrgb&w=800",
                "category": "flower",
                "rating": 4,
                "quantity": 5440,
                "createdAt": "2024-09-27T06:04:02.347Z",
                "updatedAt": "2024-09-27T06:43:54.947Z",
                "__v": 0
            }
    }

}

## License

This project is licensed under the MIT License. See the LICENSE file for details.
