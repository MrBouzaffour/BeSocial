# BeeSocial

BeeSocial is a social media platform designed for students and professionals to connect, collaborate, and stay organized. It offers features like real-time messaging, a to-do list, study tools, and financial help, all wrapped in a user-friendly interface with a pleasant bee-themed design.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Feed**: Stay updated with your friends' latest posts and activities.
- **Live Messages**: Chat with your friends in real-time.
- **To-Do List**: Keep track of your tasks and stay organized.
- **Study Tools**: Access various tools to help you with your studies.
- **Financial Help**: Get assistance with managing your finances effectively.

## Demo

You can see a live demo of BeeSocial [here](#).

# Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB
  
## Installation

Follow these steps to set up the project on your local machine:

### Backend

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/beesocial.git
cd beesocial/backend
```

2. **Install dependencies:
```bash
npm install
```
3. **Set up environment variables:
Create a .env file in the backend directory with the following content:
```bash
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Run the server:
```bash
npm start
```

### Frontend

1. **Navigate to the frontend directory:
```bash
cd ../frontend
```

2. **Install dependencies:
```bash
npm install
npm install @vue/cli-service@latest

```

3. ***Run the development server:
```bash
npm run serve
```

4. **Build the project:
```bash
npm run build
```


###Usage

1. ***Access the application:
Open your browser and navigate to http://localhost:8080 to see the frontend.

2. ***Register and Login:
  + Register a new account.
  + Log in with your credentials.
  + Access the feed and other features

Resolving Port Issues
If you encounter the error EADDRINUSE: address already in use :::3000, it means that port 3000 is already being used by another process. Follow these steps to resolve the issue:

Find and Kill the Process Using Port 3000
On Windows:
Open Command Prompt or PowerShell as an administrator.

Run the following command to find the process using port 3000:

sh
Copy code
netstat -ano | findstr :3000
This will display the list of processes using port 3000 along with their PID.

Kill the process using the PID from the previous step:

sh
Copy code
taskkill /PID <PID> /F
Replace <PID> with the actual PID of the process.

On macOS and Linux:
Open Terminal.

Run the following command to find the process using port 3000:

sh
Copy code
lsof -i :3000
Kill the process using the PID from the previous step:

sh
Copy code
kill -9 <PID>
Replace <PID> with the actual PID of the process.

Change the Port Number
If you don't want to kill the process or if the port is being used by another application, you can change the port number for your backend server.

Open your server.js file.

Change the port number from 3000 to something else, like 3001.

js
Copy code
const PORT = process.env.PORT || 3001;
Make sure to update any frontend configuration to use the new port if necessary.

Restart your backend server:

sh
Copy code
npm start
Update Environment Variables
If you use environment variables to set the port, make sure your .env file is updated accordingly:

env
Copy code
PORT=3001
This should resolve the EADDRINUSE error and allow your backend server to start properly.

Features
User Authentication (Register, Login)
User Profiles
Feed with Posts, Likes, and Comments
Chat
To-Do List
Study Tools
Financial Help
Friend Requests and Friend List
Search Functionality
Contributing
Feel free to fork this repository and make contributions. Pull requests are welcome!
