# Academic Resources API Specification - Student Hub

> **Document Status**: Active / Authoritative  
> **Base Path**: `/api/v1/resources`  
> **Last Updated**: 2026-07-29  

---

## Endpoints Summary

| Method | Path | Auth Required | Description |
|--------|------|---------------|-------------|
| `GET` | `/api/v1/resources` | No | Fetch paginated catalog of academic resources |
| `GET` | `/api/v1/resources/search` | No | Full-text multi-criteria search for resources |
| `GET` | `/api/v1/resources/:id` | No | Fetch specific resource metadata and presigned URL |
| `POST` | `/api/v1/resources` | Yes (Bearer) | Upload a new academic resource (Multipart) |
| `DELETE` | `/api/v1/resources/:id` | Yes (Bearer) | Delete an owned academic resource |

---

## 1. Get Resource Catalog

### Request Definition
- **Endpoint**: `GET /api/v1/resources`
- **Query Parameters**:
  - `page` (optional, default: `1`): Page number.
  - `limit` (optional, default: `20`, max: `100`): Items per page.
  - `courseId` (optional): Filter by course.
  - `category` (optional): Filter by type (`SYLLABUS`, `NOTES`, `TEXTBOOK`, `EXAM_PAPER`).

### Response `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "res_840192",
      "title": "CS101 Algorithms Final Exam Review Notes",
      "description": "Comprehensive summary of graph algorithms, sorting, and Big-O notation.",
      "fileUrl": "https://student-hub-assets.s3.amazonaws.com/resources/cs101-notes.pdf",
      "fileSize": 2450124,
      "mimeType": "application/pdf",
      "category": "NOTES",
      "course": {
        "id": "crs_cs101",
        "code": "CS101",
        "name": "Introduction to Computer Science"
      },
      "author": {
        "id": "usr_948201",
        "fullName": "Alex Rivera"
      },
      "createdAt": "2026-07-29T14:15:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "totalCount": 42,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 2. Upload Academic Resource

### Request Definition
- **Endpoint**: `POST /api/v1/resources`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`, `Content-Type: multipart/form-data`

### Form-Data Fields
- `file`: Raw binary file stream (PDF, DOCX, ZIP; max 50MB).
- `title`: String (3–150 characters).
- `description`: String (max 1000 characters).
- `courseId`: Valid course ID string.
- `category`: Enum (`SYLLABUS`, `NOTES`, `TEXTBOOK`, `EXAM_PAPER`).
- `tags`: JSON string array of tag strings (e.g. `["#midterm", "#notes"]`).

### Response `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "res_840192",
    "title": "CS101 Algorithms Final Exam Review Notes",
    "fileUrl": "https://student-hub-assets.s3.amazonaws.com/resources/cs101-notes.pdf",
    "category": "NOTES",
    "createdAt": "2026-07-29T14:15:00.000Z"
  }
}
```

---

## Document Cross-References

- **[api-design.md](./api-design.md)** — Standard envelopes & error handling
- **[authentication-api.md](./authentication-api.md)** — Auth API specification
