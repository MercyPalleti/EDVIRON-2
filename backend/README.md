/*# School Payments Backend


## Setup
1. Clone
2. cp .env.example .env and fill vars
3. npm install
4. npm run dev


## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/create-payment (protected)
- POST /api/webhook
- GET /api/transactions (protected)
- GET /api/transactions/school/:schoolId (protected)
- GET /api/transaction-status/:custom_order_id (protected)


## Notes
- Payment integration uses PAYMENT_API_URL and PAYMENT_API_KEY; adapt request body to gateway spec.
- Populate dummy data for testing.
```
*/
# README.md (extended)

```
# School Payments Backend

## Setup
1. Clone
2. cp .env.example .env and fill vars
3. npm install
4. npm run dev

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/create-payment  (protected)
- POST /api/webhook
- GET /api/transactions  (protected)
- GET /api/transactions/school/:schoolId  (protected)
- GET /api/transaction-status/:custom_order_id  (protected)

## Postman Collection
A ready-to-use Postman collection is included at:
```
postman/SchoolPayments.postman_collection.json
```

### Importing into Postman
1. Open Postman → File → Import → Upload `SchoolPayments.postman_collection.json`.
2. Create a Postman Environment with variables:
   - `baseUrl` → `http://localhost:5000/api`
   - `token` → JWT returned from login

### Example Requests

**Auth**
- Register: `POST {{baseUrl}}/auth/register`
  ```json
  {
    "name": "Admin",
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- Login: `POST {{baseUrl}}/auth/login`
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```

**Create Payment (requires token)**
- `POST {{baseUrl}}/create-payment`
  ```json
  {
    "custom_order_id": "ORD12345",
    "school_id": "65b0e6293e9f76a9694d84b4",
    "order_amount": 2000,
    "student_info": {
      "name": "John Doe",
      "id": "STU1001",
      "email": "john@example.com"
    },
    "return_url": "http://localhost:3000/payment-return"
  }
  ```

**Webhook Simulation**
- `POST {{baseUrl}}/webhook`
  ```json
  {
    "status": 200,
    "order_info": {
      "order_id": "ORD12345",
      "order_amount": 2000,
      "transaction_amount": 2000,
      "gateway": "PhonePe",
      "bank_reference": "YESBNK222",
      "status": "success",
      "payment_mode": "upi",
      "payemnt_details": "success@ybl",
      "Payment_message": "payment success",
      "payment_time": "2025-04-23T08:14:21.945+00:00",
      "error_message": "NA"
    }
  }
  ```

**Fetch Transactions**
- `GET {{baseUrl}}/transactions?status=success&sort=payment_time&order=desc&limit=5&page=1`
- `GET {{baseUrl}}/transactions/school/{{schoolId}}`
- `GET {{baseUrl}}/transaction-status/{{custom_order_id}}`
```

---
