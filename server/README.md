# Job Tracker Backend

Welcome to the Job Tracker backend! This Node.js application provides the server-side functionality for the Job Tracker web application.

## Getting Started
To get started with developing the backend, follow the steps below:

### Prerequisites
Make sure you have the following software installed on your system:

Node.js (including npm): https://nodejs.org/en

### Installation
1. Clone this repository to your local machine:

```
https://github.com/derussoj/cs467_job_tracker.git
```
2. Navigate to the server directory:
```
cd cs467_job_tracker/server
```
3. Install dependencies:
```
npm install
```
### Usage
1. Create a .env file in the server directory with the following environment variable: 

```
SESSION_SECRET = 'your_secret_here'
GOOGLE_CLIENT_ID = 'your_client_id_here'
GOOGLE_CLIENT_SECRET = 'your_client_secret_here'
GITHUB_CLIENT_ID = 'your_client_id_here'
GITHUB_CLIENT_SECRET = 'your_client_secret_here'
```

```
2. Start the development server:

```
npm start
```

3. Open your web browser and visit http://localhost:3000 to access the server.

### Development
* The backend server is built with Node.js and Express.
* API routes are defined in the server.js file.

### Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.
