# PERSONAL EXPENSE TRACKER - Backend

## Clone repo

```
https://github.com/rasel739/personal-expense-tracker-backend.git

```

## Setup

1. `cd personal-expense-tracker-backend`
2. `cp .env.example .env`
3. `yarn install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `yarn start`

## API

Base: `http://localhost:5000/`

### Auth

- `POST /api/auth/register` { name, email, password }
- `POST /api/auth/login` { email, password } -> returns `{ token }`

### Expenses (auth required: `Authorization: Bearer <token>`)

- `POST /api/expenses` { title, amount, category, type, note? }
- `GET /api/expenses` optional query `?type=EXPENSE&category=FOOD`
- `PATCH /api/expenses/:id` { amount?, type?, note? }
- `DELETE /api/expenses/:id`
- `GET /api/expenses/summary`

## Notes / Trade-offs

- Using Prisma for quick DB modeling.
- Basic validation with `express-validator`.
- No rate-limiting or email verification included (could be added).
