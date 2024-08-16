# BeeSocial

BeeSocial is a social media platform designed for students and professionals to connect, collaborate, and stay organized. It offers features like real-time messaging, a to-do list, study tools, and financial help, all wrapped in a user-friendly interface with a pleasant bee-themed design.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
  - [Accessing the Application](#accessing-the-application)
  - [Registering and Logging In](#registering-and-logging-in)
- [Resolving Port Issues](#resolving-port-issues)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Feed**: Stay updated with your friends' latest posts and activities.
- **Live Messages**: Chat with your friends in real-time.
- **To-Do List**: Keep track of your tasks and stay organized.
- **Study Tools**: Access various tools to help you with your studies.
- **Financial Help**: Get assistance with managing your finances effectively.
- **User Authentication**: Register and log in with secure authentication.
- **User Profiles**: Create and manage personal profiles.
- **Friend Requests and Friend List**: Connect with friends and manage your social network.
- **Search Functionality**: Find users and content easily.

## Demo

You can see a live demo of BeeSocial [here](#).

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

### Backend

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/beesocial.git
    cd beesocial/backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the backend directory with the following content:
    ```bash
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the server:**
    ```bash
    npm start
    ```

### Frontend

1. **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    npm install @vue/cli-service@latest
    npm install --save vue-toastification@next
    ```

3. **Run the development server:**
    ```bash
    npm run serve
    ```

4. **Build the project:**
    ```bash
    npm run build
    ```

## Usage

### Accessing the Application

Open your browser and navigate to `http://localhost:8080` to see the frontend.

### Registering and Logging In

- Register a new account.
- Log in with your credentials.
- Access the feed and other features.

## Resolving Port Issues

If you encounter the error `EADDRINUSE: address already in use :::3000`, follow these steps:

### Find and Kill the Process Using Port 3000

#### On Windows:

1. Open Command Prompt or PowerShell as an administrator.
2. Run the following command to find the process using port 3000:
    ```bash
    netstat -ano | findstr :3000
    ```
3. Kill the process using the PID from the previous step:
    ```bash
    taskkill /PID <PID> /F
    ```

#### On macOS and Linux:

1. Open Terminal.
2. Run the following command to find the process using port 3000:
    ```bash
    lsof -i :3000
    ```
3. Kill the process using the PID from the previous step:
    ```bash
    kill -9 <PID>
    ```

### Change the Port Number

1. Open your `server.js` file.
2. Change the port number from 3000 to something else, like 3001:
    ```js
    const PORT = process.env.PORT || 3001;
    ```
3. Update any frontend configuration to use the new port if necessary.
4. Restart your backend server:
    ```bash
    npm start
    ```

### Update Environment Variables

If you use environment variables to set the port, update your `.env` file accordingly:
```bash
PORT=3001
```
## Contributing
Feel free to fork this repository and make contributions. Pull requests are welcome!

## License
Include information about the project's license here.
