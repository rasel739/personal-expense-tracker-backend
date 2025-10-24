# 💰 Personal Expense Tracker – Backend

A clean and minimal **backend API** for managing personal income and expenses.
Built with **Node.js**, **Express.js**, **Prisma**, and **PostgreSQL**.

---

## 🚀 Tech Stack

- **Backend Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Zod / express-validator
- **Authentication:** JWT
- **Runtime:** Node.js
- **Package Manager:** Yarn

---

## 🧩 Features

✅ User authentication (Register / Login)
✅ Secure JWT-based authorization
✅ CRUD operations for income & expenses
✅ Filter by category and type
✅ Summary of total income & expenses
✅ Prisma-powered database modeling
✅ Environment-based configuration

---

## 📦 Getting Started

### 🔹 Clone the Repository

```bash
git clone https://github.com/rasel739/personal-expense-tracker-backend.git
cd personal-expense-tracker-backend
```

---

### 🔹 Setup Environment

Copy the example environment file and update with your own credentials:

```bash
cp .env.example .env
```

---

### 🔹 Install Dependencies

```bash
yarn install
```

---

### 🔹 Run Database Migration

```bash
yarn prisma:migrate:dev
```

```bash
yarn prisma:migrate:prod
```

---

### 🔹 Start the Development Server

```bash
yarn dev
```

> Server runs on: `http://localhost:5000`

---

## 🏗️ Build for Production

```bash
yarn build
yarn start
```

---

## 🔗 API Base URL

```
http://localhost:5000/api/v1
```

---

## 🔐 Authentication

| Method | Endpoint             | Description                  | Body                        |
| ------ | -------------------- | ---------------------------- | --------------------------- |
| `POST` | `/api/auth/register` | Register new user            | `{ name, email, password }` |
| `POST` | `/api/auth/login`    | Login user and get JWT token | `{ email, password }`       |

**Response:**

```json
data:{
  "acessToken": "your.jwt.token"
}
```

---

## 💸 Expense Endpoints (Requires Authorization)

All expense routes require a valid JWT token in headers:

```
Authorization: Bearer <token>
```

| Method   | Endpoint                | Description                                |
| -------- | ----------------------- | ------------------------------------------ |
| `POST`   | `/api/expenses`         | Create a new expense or income             |
| `GET`    | `/api/expenses`         | Get all expenses (filter by type/category) |
| `PATCH`  | `/api/expenses/:id`     | Update an existing expense                 |
| `DELETE` | `/api/expenses/:id`     | Delete an expense                          |
| `GET`    | `/api/expenses/summary` | Get total income & expense summary         |

**Example Query:**

```
GET /api/expenses?type=EXPENSE&category=FOOD
```

---

## 🧪 API Testing (Postman)

You can test all API endpoints using the Postman collection below:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/19946685/2sB3Wjy3bv)

---

## ⚙️ Project Structure

```
personal-expense-tracker-backend/
├── prisma/                # Prisma schema & migrations
├── src/
│   ├── config/            # Environment config
│   ├── modules/           # Feature-based modules (auth, expenses)
│   ├── middlewares/       # Global error handling & auth middleware
│   ├── utils/             # Helper functions
│   └── server.ts          # Express app entry point
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🧠 Notes / Trade-offs

- Used **Prisma** for fast and type-safe database modeling
- Basic **validation** with Zod / express-validator
- **Error handling middleware** for consistent responses
- Could extend with:
  - Rate limiting
  - Email verification
  - Category management
  - Expense analytics dashboards

---

## 👨‍💻 Author

**Rasel Hossain**
🚀 Full Stack Developer | JavaScript | TypeScript | Prisma | PostgreSQL
📧 Email: [raselhossain6059@gmail.com](mailto:raselhossain6059@gmail.com)
🌐 GitHub: [@rasel739](https://github.com/rasel739)
