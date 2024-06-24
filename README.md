# Social Media App

This is a simple social media application built with a Node.js backend using Express and MongoDB, and a frontend using HTML, CSS, and JavaScript.

## Features

- User Registration
- User Login
- Create Posts
- View Posts

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (v4.4 or later)
- [Git](https://git-scm.com/)

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/yourusername/Bee.git
cd Bee
```
### Backend Setup

```bash
cd backend
npm install
```
### Create a .env file

Create a .env file in the backend directory and add the following environment variables:
```bash
MONGODB_URI=mongodb://localhost:27017/bee
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Start the backend server
```bash
npm run server
```
