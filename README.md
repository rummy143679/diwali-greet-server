# 🎇 Diwali Greeting Generator - Backend Server

An Express.js backend server that powers the Diwali Greeting Generator application. It handles user authentication, integrates with Google's Gemini AI API for generating personalized Diwali greetings, and manages user data with MongoDB.

## 🎯 Project Overview

This is the backend server for the Diwali Greeting Generator application. It provides:
- User authentication and session management with JWT tokens
- Integration with Google Gemini AI API for greeting generation
- RESTful APIs for user management and greeting generation
- MongoDB database for persistent user storage
- CORS-enabled endpoints for cross-origin requests
- Cookie-based authentication with HTTP-only security

## ✨ Features

✅ **User Authentication** - Sign up, login, and JWT-based session management  
✅ **Password Security** - Bcrypt hashing for secure password storage  
✅ **AI Integration** - Google Gemini API for personalized greeting generation  
✅ **Multiple Languages** - Support for English, Hindi, and Hinglish greetings  
✅ **Customizable Tone** - Formal and Informal greeting tones  
✅ **MongoDB Integration** - NoSQL database for user data persistence  
✅ **JWT Tokens** - Secure token-based authentication  
✅ **HTTP-Only Cookies** - Secure cookie storage with production hardening  
✅ **CORS Support** - Cross-origin resource sharing for frontend integration  
✅ **Email Validation** - Input validation for email addresses  

## 🛠 Tech Stack

- **Express.js** (5.1.0) - Node.js web application framework
- **MongoDB** - NoSQL database
- **Mongoose** (8.19.1) - MongoDB object modeling and validation
- **JWT** (9.0.2) - JSON Web Token authentication
- **Bcrypt** (6.0.0) - Password hashing with salt
- **Cors** (2.8.5) - Cross-origin resource sharing middleware
- **Dotenv** (17.2.3) - Environment variable management
- **Nodemon** (3.1.10) - Development server auto-restart
- **Body-Parser** (2.2.0) - Request body parsing middleware
- **Cookie-Parser** (1.4.7) - Cookie parsing middleware
- **Validator** (13.15.15) - Input validation library

## 📁 Project Structure

```
diwali-greet-server/
├── configuration/               # Configuration files
│   └── db.config.js            # MongoDB connection setup
├── middlewares/                 # Custom middleware
│   └── user.middlware.js        # JWT authentication middleware
├── models/                      # Mongoose schemas
│   └── user.model.js            # User data model with auth methods
├── routers/                     # API route handlers
│   ├── user.router.js           # User signup, login, auth endpoints
│   └── gemini.router.js         # Greeting generation endpoint
├── utils/                       # Utility functions
│   └── build.prompt.js          # Prompt builder for Gemini API
├── server.js                    # Main server entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v14 or higher
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB)
- Google Cloud account with Gemini API enabled

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd diwali-greet-server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment configuration**
Create a `.env` file in the root directory:
```bash
PORT=4000
NODE_ENV=development
GEMINI_API_KEY=your_google_gemini_api_key
JWT_KEY=your_secret_jwt_key_here
```

4. **Update MongoDB connection** (in `configuration/db.config.js`)
```javascript
const url = "mongodb+srv://username:password@cluster.mongodb.net/database-name";
```

### Development

Start the development server with auto-restart:
```bash
npm start
```

The server will run on `http://localhost:4000`

Server logs:
```
db is running
Listening to the port 4000
```

## 🔄 How It Works

### Authentication Flow

1. **User Registration**
   - Client sends POST request with firstName, lastName, email, password
   - Password hashed with Bcrypt (10 salt rounds)
   - User saved to MongoDB

2. **User Login**
   - Client sends email and password
   - Server retrieves user from database
   - Bcrypt compares provided password with stored hash
   - JWT token generated with user ID and email
   - Token set in HTTP-only cookie

3. **Protected Routes**
   - Client sends request with cookie containing JWT
   - Middleware extracts and verifies token
   - Request proceeds if token valid
   - Returns 401 if token missing or invalid

### Greeting Generation Flow

1. **User Submits Request**
   - Client sends name, language, and tone
   - Server validates authentication

2. **Prompt Building**
   - `buildPrompt()` creates customized AI prompt
   - Includes language preference
   - Includes tone preference
   - Personalizes with user's name

3. **Gemini API Call**
   - Sends prompt to Google Generative Language API
   - Model: `gemini-2.5-flash`
   - Retrieves AI-generated greeting

4. **Response to Client**
   - Returns greeting text
   - Error handling for API failures

## 🔐 Security Features

- **Password Hashing** - Bcrypt with 10 salt rounds
- **JWT Tokens** - Stateless authentication
- **HTTP-Only Cookies** - Prevents XSS attacks
- **Secure Flag** - Cookies only sent over HTTPS in production
- **SameSite Attribute** - CSRF protection set to `None` for cross-site
- **Email Validation** - Validator library checks email format
- **Input Sanitization** - Body-parser safely parses JSON
- **CORS Whitelisting** - Only allowed origins can access
- **Middleware Protection** - `isLoggedIn` middleware on sensitive routes

## 📝 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server listening port | No | `4000` |
| `NODE_ENV` | Deployment environment | No | `development` or `production` |
| `GEMINI_API_KEY` | Google Gemini API key | **Yes** | `AIzaSyD...` |
| `JWT_KEY` | Secret key for JWT signing | **Yes** | `my-secret-key-123` |


## 🐛 Troubleshooting

**Error: "Kindly put your gemini key"**
- ✅ Solution: Add `GEMINI_API_KEY` to `.env` file
- Verify API key is valid in Google Cloud Console
- Ensure Gemini API is enabled for your project

**Error: "db is not running" or MongoDB connection fails**
- ✅ Verify MongoDB Atlas cluster is running
- Check connection string in `configuration/db.config.js`
- Ensure IP is whitelisted in MongoDB Atlas
- Verify database credentials

**Error: "Unauthorized" on protected routes**
- ✅ Ensure cookies are sent with requests
- Frontend should use `withCredentials: true` in axios
- Check JWT_KEY is consistent across server restarts
- Verify token has not expired

**Port 4000 Already in Use**
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <process_id> /F

# macOS/Linux
lsof -i :4000
kill -9 <process_id>
```

