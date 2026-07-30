# Authentication & Identity API Specification - Student Hub

> **Document Status**: Active / Authoritative  
> **Base Path**: `/api/v1/auth`  
> **Last Updated**: 2026-07-29  

---

## Endpoints Summary

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| `POST` | `/api/v1/auth/register` | No | Register a new student user account |
| `POST` | `/api/v1/auth/login` | No | Authenticate user credentials & issue JWT |
| `GET` | `/api/v1/auth/me` | Yes (Bearer) | Get current authenticated user profile |
| `POST` | `/api/v1/auth/logout` | Yes (Bearer) | Terminate current user token session |

---

## 1. Register User Account

### Request Definition
- **Endpoint**: `POST /api/v1/auth/register`
- **Headers**: `Content-Type: application/json`

### Request Body (Zod Validated)
```json
{
  "email": "alex.student@university.edu",
  "password": "SecurePassword123!",
  "fullName": "Alex Rivera",
  "programId": "prog_cs_bachelor"
}
```

### Validation Rules
- `email`: Required, valid email string, ending with recognized university domain.
- `password`: Required, minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character.
- `fullName`: Required, string, 2–100 characters.

### Response `201 Created`
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_948201",
      "email": "alex.student@university.edu",
      "fullName": "Alex Rivera",
      "role": "STUDENT",
      "createdAt": "2026-07-29T14:10:00.000Z"
    }
  }
}
```

---

## 2. Login User

### Request Definition
- **Endpoint**: `POST /api/v1/auth/login`
- **Headers**: `Content-Type: application/json`

### Request Body
```json
{
  "email": "alex.student@university.edu",
  "password": "SecurePassword123!"
}
```

### Response `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_948201",
      "email": "alex.student@university.edu",
      "fullName": "Alex Rivera",
      "role": "STUDENT"
    }
  }
}
```

### Error Response `401 Unauthorized`
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password combination.",
    "details": null
  }
}
```

---

## 3. Get Current User Profile

### Request Definition
- **Endpoint**: `GET /api/v1/auth/me`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`

### Response `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "usr_948201",
    "email": "alex.student@university.edu",
    "fullName": "Alex Rivera",
    "role": "STUDENT",
    "program": {
      "id": "prog_cs_bachelor",
      "name": "Bachelor of Science in Computer Science"
    }
  }
}
```

---

## Document Cross-References

- **[api-design.md](./api-design.md)** — Standard response envelopes & status codes
- **[resources-api.md](./resources-api.md)** — Resources REST API specification
