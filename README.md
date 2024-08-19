
# SimpleSocial

**Note: This project is currently under development. Some features may be incomplete or subject to change.**

SimpleSocial is a robust social media platform, aiming to enhance communication, organization, and collaboration.

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

- **Feed**: Stay updated with posts and activities.
- **Live Messages**: Engage in real-time chats.
- **To-Do List**: Organize and manage tasks efficiently.
- **Study Tools**: Access tools for academic assistance.
- **User Authentication**: Secure and reliable login system.
- **User Profiles**: Customize and manage personal profiles.
- **Friend Requests and Friend List**: Build and maintain connections.
- **Search Functionality**: Easily locate users and content.

## Demo

A live demo of SimpleSocial is available [here](#).

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

### Backend

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/simplesocial.git
    cd simplesocial/backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    ```plaintext
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

Navigate to `http://localhost:8080` in your browser to access the frontend.

### Registering and Logging In

- Sign up for a new account.
- Log in using your credentials.
- Explore the feed and utilize other features.

## Resolving Port Issues

If you face the `EADDRINUSE: address already in use :::3000` error, follow the steps below to resolve it.

### Find and Kill the Process Using Port 3000

#### On Windows:

1. Open Command Prompt or PowerShell as an administrator.
2. Run the following command:
    ```bash
    netstat -ano | findstr :3000
    ```
3. Terminate the process using the PID from the output:
    ```bash
    taskkill /PID <PID> /F
    ```

#### On macOS and Linux:

1. Open Terminal.
2. Execute:
    ```bash
    lsof -i :3000
    ```
3. Kill the process using:
    ```bash
    kill -9 <PID>
    ```

### Change the Port Number

Modify the `server.js` file to use a different port, such as 3001, and adjust any necessary frontend configurations. Restart your backend server with:
```bash
npm start
```

### Update Environment Variables

Adjust your `.env` file if you're using environment variables to set the port:
```bash
PORT=3001
```

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License

Include your project's license information here.
