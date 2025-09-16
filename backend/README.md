# EDVIRON Backend API Documentation

## Project Setup Instructions

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and define necessary variables, e.g.:
    ```env
    
PORT=5000

MONGO_URI=<your-mongodb-url>

JWT_SECRET=edviron-software-development

JWT_EXPIRES_IN=7d

PAYMENT_API_URL=https://dev-vanilla.edviron.com/erp/create-collect-request

PAYMENT_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVlSWQiOiI2NWIwZTU1MmRkMzE5NTBhOWI0MWM1YmEiLCJJbmRleE9mQXBpS2V5Ijo2fQ.IJWTYCOurGCFdRM2xyKtw6TEcuwXxGnmINrXFfsAdt0

PG_KEY=edvtest01

SCHOOL_ID=65b0e6293e9f76a9694d84b4

CASHFREE_APP_ID=<your-cashfree-app-id>

CASHFREE_SECRET_KEY=<your-cashfree-secret-key>


## Base URL
```
http://localhost:5000/api
```

---

## Authentication Routes

### POST `/auth/register`
- Registers a new user.
- **Body Parameters**:
    - `name`: string
    - `email`: string
    - `password`: string

### POST `/auth/login`
- Authenticates a user.
- **Body Parameters**:
    - `email`: string
    - `password`: string

---

## Payment Routes

### POST `/payment/create`
- Creates a new payment.
- **Headers**: `Authorization: Bearer <token>`
- **Body Parameters**:
    - `schoolName`: string
    - `amount`: number
    - `description`: string

### GET `/payment/list`
- Retrieves a list of payments.
- **Headers**: `Authorization: Bearer <token>`

---

## Webhook Routes

### POST `/webhook/receive`
- Receives external webhook events.

---

## Transaction Routes

### GET `/transactions`
- Retrieves transaction data.
- **Headers**: `Authorization: Bearer <token>`

---

## Notes
- Ensure `Authorization` headers are sent for protected routes.
- Use JSON format for request bodies.
