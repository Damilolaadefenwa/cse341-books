# Books API Spec

## Purpose

Build a read-only Books API in Express with MongoDB storage.

## Data Model

- **Database:** cse341-books-db
- **Collection:** books

### Book Object Structure

- `id`: string (required)
- `author`: string (required)
- `title`: string (required)
- `publicationDate`: string in ISO 8601 date format, e.g., "2021-08-17" (required)

## Endpoints

### 1. GET /books

- **Description:** Return all books.
- **Success Status:** 200 OK
- **Error Status:** 500 Internal Server Error
- **Success Response Body:**

```json
[
  {
    "id": "b1",
    "author": "Maya Rivera",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]
```

### 2. GET /books/:id

- **Description:** Return one book by its ID.
- **Success Status:** 200 OK
- **Not Found Status:** 404 Not Found
- **Error Status:** 500 Internal Server Error
- **Success Response Body:**

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

- **Not found response body example:**

```json
{
  "message": "Book not found"
}
```

## Error Handling

- Do not expose stack traces or internal database errors to clients.
- Return a simple message for 500 internal server errors:

```json
{
  "message": "Internal server error"
}
```

## Implementation Notes

- Store records in a MongoDB collection named `books`.
- Seed the collection with sample book documents needed for testing.
- Store the MongoDB connection string securely in `.env`.

## Out of Scope for Week 1

- POST, PUT, DELETE routes
- Authentication and authorization.
