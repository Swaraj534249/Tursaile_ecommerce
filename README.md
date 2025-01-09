# Project Setup

## Prerequisites

 * Node.js ( version v21.1.0 or later )
 * MongoDB installed and running locally
## Clone the project
  ```bash 
   git clone https://github.com/RishiBakshii/mern-ecommerce.git 
  ```

## Navigate to the project directory
```bash 
  cd mern-ecommerce
```
## Install dependencies for frontend and backend separately

Tip: To efficiently install dependencies for both frontend and backend simultaneously, use split terminals.

Install frontend dependencies
```bash 
cd frontend
npm install
```
Install backend dependencies
```bash 
cd backend
npm install
```
## Environment Variables
### Backend

* Create a `.env` file in the `backend` directory.
* Add the following variables with appropriate values
```bash
# Database connection string
MONGO_URI="mongodb://localhost:27017/your-database-name"

# Frontend URL (adjust if needed)
ORIGIN="http://localhost:3000"

# Email credentials for sending password resets and OTPs
EMAIL="your-email@example.com"
PASSWORD="your-email-password"

# Token and cookie expiration settings
LOGIN_TOKEN_EXPIRATION="30d"  # Days
OTP_EXPIRATION_TIME="120000"  # Milliseconds
PASSWORD_RESET_TOKEN_EXPIRATION="2m"  # Minutes
COOKIE_EXPIRATION_DAYS="30"    # Days

# Secret key for jwt security
SECRET_KEY="your-secret-key"

# Environment (production/development)
PRODUCTION="false" # Initially set to false for development
```
### Frontend

* Create a .env file in the frontend directory
* Add the following variable:
```bash
# Backend URL (adjust if needed)
REACT_APP_BASE_URL="http://localhost:8000"
```
### Important

* Replace all placeholders (e.g., your_database_name, your_email) with your actual values.
* Exclude the .env file from version control to protect sensitive information.
