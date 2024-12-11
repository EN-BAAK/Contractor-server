# Contractor-server

This project is the backend for the Contractor Management System. It is built using:

- TypeScript
- MySQL
- Express
- Node.js
- Sequelize

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
- Get users.
- Add contractors.
- Edit contractors.
- Delete contractors.
- Get finished contractors.
- Get unfinished contractors.

### 2. Auth Controller
- Login.
- Get user.
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
- Get testers' `fullName` and `id`.

## Setup Instructions

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
   PORT=
   FRONTEND_URL=
   JWT_SECRET_KEY=
   JWT_EXPIRES=
   COOKIE_EXPIRE=
   HOST=
   PASSWORD=
   USER=
   DATABASE=
   SALT=
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

7. Navigate to the backend source directory:
   ```bash
   cd ~/backend-repo/src
   ```

8. Edit the path to the frontend `dist/index.html` file in `index.ts` (line 40).

9. Go to MySQL environment.

10. In your database, run the following command:
    ```sql
    INSERT INTO users (fullName, password, mobileNumber, role, createdAt, updatedAt) 
    VALUES ('Admin', '$2a$10$Mg30BfcdCGAsuOepJasjr.VLtC3jZuTuRxqIX.O2g3jhI9xePzy06', '123', 'admin', NOW(), NOW());
    ```
    **Note:** The password here is `123`.

11. Start the project:
    ```bash
    npm start
    ```

12. Open your browser and navigate to:
    ```
    http://localhost:PORT
    ```

---

**Designed and coded by me.**
