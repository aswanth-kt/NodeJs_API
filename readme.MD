# 🚀 Node.js + Express API (MVC Architecture)

A simple backend API built using **Node.js**, **Express**, and **MongoDB** following the **MVC (Model-View-Controller)** pattern. This project demonstrates core backend concepts like authentication, session handling, and CRUD operations.

---

## 📌 Features

* User Registration & Login
* Password Hashing using bcrypt
* Session-based Authentication
* Get Current User Profile
* Update Profile Information
* Update Password
* Logout Functionality
* MVC Architecture Structure

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* express-session
* bcrypt
* dotenv
* nodemon (dev)

---

## ⚙️ Installation & Setup

1. Clone the repository

```bash id="tyxq08"
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies

```bash id="lrwxj9"
npm install
```

3. Create `.env` file

```id="mhcs2r"
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

4. Run the server

```bash id="51pj2j"
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Auth Routes

#### Register User

```id="36l44f"
POST /register
```

**Body:**

```json id="2cumd7"
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

---

#### Login User

```id="9zlu7k"
POST /login
```

**Body:**

```json id="bkq8ku"
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

#### Logout User

```id="byz9l6"
POST /logout
```

---

### 👤 User Routes

#### Get Current User

```id="3pn8sh"
GET /profile
```

---

#### Update Profile

```id="3fjsh7"
PUT /update-profile
```

**Body:**

```json id="qpuokf"
{
  "name": "Updated Name",
  "email": "updated@email.com"
}
```

---

#### Update Password

```id="7rqiu1"
PATCH /update-password
```

**Body:**

```json id="rg8xyp"
{
  "oldPassword": "123456",
  "newPassword": "newpassword"
}
```

---

## 📚 API Documentation

You can view and test the full API collection here:
👉 https://documenter.getpostman.com/view/41845512/2sBXqJMMMn


---

## 🧪 Testing

Use **Postman** to test all API endpoints:

* Test all routes (GET, POST, PUT, PATCH)
* Verify session handling (login → access profile → logout)
* Check proper responses and status codes

---

## 🎯 Goal of This Project

To understand:

* Backend fundamentals
* API creation using Express
* Database integration with MongoDB
* MVC architecture
* Authentication & session management

---

## ✅ Status

✔ Completed basic API functionality

✔ Tested using Postman

✔ Ready for further enhancements

---

## 📌 Future Improvements

* Add input validation
* Implement JWT authentication
* Add role-based authorization
* Improve error handling
* Add frontend integration

---

## 👨‍💻 Author

**Aswanth KT**

---
