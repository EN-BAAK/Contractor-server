# Contractor-server

This project is the backend for the Contractor Management System. It is built using:

- TypeScript
- Node.js
- Express
- MySQL
- Sequelize ORM

## Models

### 1. Users
- `id`
- `fullName`
- `mobileNumber`
- `role` (admin, tester, secretary, mainTester)
- `password`

### 2. Renews
- `id`
- `name`
- `companyName`
- `phone`
- `city`
- `location`
- `locationLink`
- `notes`

### 3. Contracts
- `id`
- `name`
- `companyName`
- `phone`
- `city`
- `location`
- `locationLink`
- `date`
- `tester_id`
- `tester_name`
- `done`
- `order`
- `creator`

## Controllers

### 1. Admin Controller
- Add users.
- Delete users.
- Edit users.
- Get all users.
- Add contractors.
- Edit contractors.
- Delete contractors.
- Get finished contractors.
- Get unfinished contractors.

### 2. Auth Controller
- Login.
- Get user details.
- Verify token.
- Logout.

### 3. Contract Controller
- Add renews.
- Get renews.
- Delete renews.
- Edit renews.
- Mark renews as finished.
- Unmark renews as unfinished.
- Get unfinished renews.
- Get finished renews.

### 4. Tester Controller
- Get testers' full names and IDs.

## Setup Instructions

To toggle the project:

1. Clone the repository:
   ```bash
   git clone https://github.com/EN-BAAK/Contractor-server.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following:
   ```env
   PORT=YOUR_PORT_NUMBER
   FRONTEND_URL=http://localhost:YOUR_FRONTEND_PORT
   JWT_SECRET_KEY=YOUR_SECRET_KEY
   JWT_EXPIRES=YOUR_EXPIRATION_TIME
   COOKIE_EXPIRE=YOUR_COOKIE_EXPIRATION_TIME
   HOST=YOUR_DATABASE_HOST
   PASSWORD=YOUR_DATABASE_PASSWORD
   USER=YOUR_DATABASE_USER
   DATABASE=YOUR_DATABASE_NAME
   SALT=YOUR_SALT_VALUE
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Clone the frontend repository:
   ```bash
   git clone https://github.com/EN-BAAK/Contractor-frontend.git
   ```

6. Follow the frontend README file for further documentation and setup instructions.

7. Navigate to `src/index.ts`:
   ```bash
   cd src
   ```
   Update the path to the frontend's `dist/index.html` file in line 40.

8. Start the server:
   ```bash
   npm start
   ```

9. Open the project in your browser:
   ```
   http://localhost:PORT
   ```

---

**Designed and coded by me.**
