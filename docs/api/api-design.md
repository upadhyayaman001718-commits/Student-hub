# REST API Design Specification - Student Hub

> **Document Status**: Active / Authoritative  
> **API Version**: `v1`  
> **Base URL**: `/api/v1`  
> **Format**: JSON (`Content-Type: application/json`)  
> **Last Updated**: 2026-07-29  

---

## 1. REST API Design Principles

Student Hub REST APIs strictly adhere to **REST (Representational State Transfer)** conventions:

1. **Nouns over Verbs in Resource URIs**: Use plural nouns (`/resources`, `/courses`, `/users`) rather than action verbs (`/getResources`, `/createUser`).
2. **Standard HTTP Methods**:
   - `GET`: Retrieve resource collections or individual entities (Idempotent).
   - `POST`: Create a new resource (Non-idempotent).
   - `PUT`: Replace an existing resource completely (Idempotent).
   - `PATCH`: Partially update an existing resource (Non-idempotent).
   - `DELETE`: Remove a resource (Idempotent).
3. **Stateless Bearer Authentication**: Requests requiring authentication must pass a valid JWT in the HTTP header:
   ```http
   Authorization: Bearer <JWT_TOKEN>
   ```

---

## 2. Standard JSON Response Envelopes

To maintain a predictable client-side parsing experience, ALL API responses adhere to unified JSON envelope contracts.

### 2.1 Success Response Envelope (`HTTP 200 OK` / `HTTP 201 Created`)

```json
{
  "success": true,
  "data": {
    "id": "res_cjk1847192",
    "title": "CS101 Midterm Exam Study Guide 2025",
    "fileUrl": "https://student-hub-assets.s3.amazonaws.com/resources/cs101-midterm.pdf",
    "createdAt": "2026-07-29T14:00:00.000Z"
  },
  "meta": {
    "timestamp": "2026-07-29T14:00:01.234Z"
  }
}
```

### 2.2 Paginated Collection Response Envelope

```json
{
  "success": true,
  "data": [
    { "id": "res_1", "title": "Data Structures Notes" },
    { "id": "res_2", "title": "Algorithms Cheatsheet" }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalCount": 142,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2.3 Error Response Envelope (`HTTP 4xx` / `HTTP 5xx`)

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested academic resource with ID res_999 was not found.",
    "details": null
  },
  "meta": {
    "timestamp": "2026-07-29T14:00:01.234Z"
  }
}
```

---

## 3. Standard HTTP Status Codes

| Code | Status Name | Usage Description |
|------|-------------|-------------------|
| `200` | **OK** | Request successfully processed; returns data payload. |
| `201` | **Created** | Resource successfully created (e.g. user registered, document uploaded). |
| `400` | **Bad Request** | Invalid input body, missing required fields, or Zod validation failure. |
| `401` | **Unauthorized** | Missing, invalid, or expired JWT token in `Authorization` header. |
| `403` | **Forbidden** | Valid token present, but user lacks permissions for the requested action. |
| `404` | **Not Found** | Requested URI or database entity does not exist. |
| `409` | **Conflict** | Resource already exists (e.g. registration attempt with duplicate email). |
| `422` | **Unprocessable Entity** | Business logic validation failure (e.g. invalid file format). |
| `429` | **Too Many Requests** | Rate limit exceeded. |
| `500` | **Internal Server Error** | Unhandled backend exception; intercepted by error middleware. |

---

## 4. Document Cross-References

- **[authentication-api.md](./authentication-api.md)** — Authentication REST API endpoints
- **[resources-api.md](./resources-api.md)** — Academic Resources REST API endpoints
- **[../architecture/backend-architecture.md](../architecture/backend-architecture.md)** — Backend layer implementation
