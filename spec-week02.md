# Books API Week 02 Specification

## Part 1: Specification Version 1

---

### Feature 1: Book CRUD Operations and Author References

#### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD endpoints operations for books. Every book route must be documented and testable in Swagger.

#### Data Model

- **Database:** cse341-books-db
- **Collection:** books

### Book Object Structure

- `id`: string (required) custom id such as `b1`
- `authorId`: string (required) references the `a1` field of an author document
- `title`: string (required)
- `publicationDate`: string in ISO 8601 date format, e.g., "2021-08-17" (required)

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

#### Relationship to Authors

Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

## Endpoints and Error handling

#### Routes

##### GET /books

Purpose: Return all books.

Success:

- Status code: `200` Ok
- Response body: returned an array of book objects

```json
[
  {
    "id": "b1",
    "authorId": "a1",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]
```

Errors:

- `500` Internal Server or Database Error

```json
{"message":
    "Unable to retrieve book"
}.
```

##### GET /books/:id

Purpose: Return a single book by its custom id.

Success:

- Status code: `200` Ok
- Response body: a single matching book object

```json
{
  "id": "b1",
  "authorId": "a1",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

Errors:

- `404` Not Found

```json
{
  "message": "Book not found"
}
```

- `500` Internal Server or Database Error

```json
{"message":
    "Unable to retrieve book"
}.
```

##### POST /books

Purpose: Create a new book.
Request body:

```json
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Success:

- Status code: `201` Created
- Response body: Returns the newly created book object

Errors:

- `400` Bad Request

```json
{
  "message": "Missing required fields: id, authorId, title, and publicationDate are required"
}
```

- `400` Bad Request

```json
{ "message": "Book with this id already exists" }
```

- `400` Bad Request

```json
{ "message": "Referenced authorId does not exist" }
```

- `500` Internal Server or Database Error

```json
{ "message": "Unable to create book" }
```

#### PUT /books/:id

Purpose: Update an existing book.

Request body:

```json
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

Success:

- Status code: `200` OK
- Response body: Returns the updated book object

Errors:

- `400` Bad Request

```json
{
  "message": "Missing required fields: authorId, title, and publicationDate are required"
}
```

- `400` Bad Request

```json
{ "message": "Referenced authorId does not exist" }
```

- `404` Not Found

```json
{ "message": "Book not found" }
```

- `500` Internal Server or Database Error

```json
{ "message": "Unable to Update book" }
```

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

- Status code: `204` No Content
- Response body: Empty response body

Errors:

- `404` Not Found

```json
{ "message": "Book not found" }
```

- `500` Internal Server or Database Error

```json
{ "message": "Unable to delete book" }
```

## Swagger Documentation

Swagger must document every book route.

## Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

---

## Part 2: Specification Version 2

---

### Feature 2: Author CRUD Operations

#### Goal

Create a new authors collection and implement full CRUD endpoints operations for authors. Every author route must be documented and testable in Swagger.

#### Data Model

Author documents will be stored in the authors collection.

- **Database:** cse341-books-db
- **Collection:** authors

### Author Object Structure

- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: integer, required, numeric value e.g 1985

Authors will use custom string ids (such as a1, a2) instead of MongoDB `_id` values for route parameters.

#### Relationship to Books

An author can have zero, one, or many books referencing their `Id`.

If a user tries to delete an author who still has books assigned to their `authorId`, the API must reject the deletion request with a `400` status code to prevent leaving orphaned books in the database.

## Endpoints and Error Handling

#### Routes

#### GET /authors

Purpose: Retrieve all authors.

Success:

- Status code: `200`
- Response body: returned an array of author objects

```json
[{ "id": "a1", "name": "Maya Rivera", "birthYear": 1985 }]
```

Errors:

- `500` Internal Server or Database Error

```json
{ "message": "Unable to retrieve authors" }
```

#### GET /authors/:id

Purpose: Retrieve one author by their custom id.

Success:

- Status code: `200` OK
- Response body: Return the matching author object

```json
{ "id": "a1", "name": "Maya Rivera", "birthYear": 1985 }
```

Errors:

- `404` Not Found

```json
{ "message": "Author not found" }
```

- `500` Internal Server or Database Error

```json
{ "message": "Unable to retrieve author" }
```

#### POST /authors

Purpose: Create a new author.

Request body:

```json
{
  "id": "a1",
  "name": "Maya Rivera",
  "birthYear": 1985
}
```

Success:

- Status code: `201` Created
- Response body: Returned the newly created author object

Errors:

- `400` Bad Request

```json
{
  "message": "Missing required fields: id, name, and birthYear are required"
}
```

- `400` Bad Request

```json
{ "message": "Author with this id already exists" }
```

- `400` Bad Request

```json
{ "message": "birthYear must be a valid number" }
```

- `500` Internal Server or Database Error

```json
{ "message": "Unable to create author" }
```

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

```json
{
  "name": "Maya Rivera Updated",
  "birthYear": 1986
}
```

Success:

- Status code: `200`OK
- Response body: Returns the updated author object

Errors:

- `400` Bad Request

```json
{ "message": "Missing required fields: name and birthYear are required" }
```

- `400` Bad Request

```json
{ "message": "birthYear must be a valid number" }
```

- `400` Not Found

```json
{ "message": "Author not found" }
```

- `500` Internal Server or Database Error

```json
{ "message": "Unable to update author" }
```

#### DELETE /authors/:id

Purpose: Delete an existing author.

Success:

- Status code: `204` No Content
- Response body: Empty response body

Errors:

- `400` Bad Request

```json
{ "message": "Cannot delete author because associated books exist" }
```

- `400` Not Found

```json
{ "message": "Author not found" }
```

- `500` Internal Server or Database Error

```json
{ "message": "Unable to delete author" }
```

## Swagger Documentation

Swagger must document every author route.

## Deployment Expectations

After implementation, author routes must work locally and from the deployed Render application at /api-docs.
