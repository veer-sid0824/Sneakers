# Sneakers Backend (PostgreSQL + Prisma)

## 1) Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your PostgreSQL connection string and JWT secret.

Optional: start local PostgreSQL with Docker:

```bash
docker compose up -d
```

## 2) Prepare database

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init_auth
```

## 3) Run server

```bash
npm run dev
```

Server runs on `http://localhost:5000`.

## Auth endpoints

- `POST /api/auth/signup`
  - body: `{ "fullName": "John Doe", "email": "john@example.com", "password": "StrongPass123!" }`
- `POST /api/auth/signin`
  - body: `{ "email": "john@example.com", "password": "StrongPass123!" }`

Both return:

```json
{
  "message": "...",
  "token": "jwt-token",
  "user": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-03-31T00:00:00.000Z"
  }
}
```

## Health check

- `GET /api/health`

## Demo payment endpoints

- `POST /api/payments/checkout`
  - body: `{ "email": "...", "cardName": "...", "cardNumber": "4242 4242 4242 4242", "expiry": "12 / 30", "cvc": "123", "country": "India", "items": [...], "total": 199 }`
  - returns created order with `orderId`
- `GET /api/orders/:orderId`
  - returns order and backend-driven demo status progression (`ordered -> packed -> shipped -> out-for-delivery -> delivered`)
