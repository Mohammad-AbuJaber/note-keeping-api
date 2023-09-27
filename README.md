# Note-Keeping REST API

This repository contains a REST API built using Node.js, Express.js, and MongoDB for a note-keeping application.
Users can perform CRUD operations on notes through this API.

## Requirements

1. Each note should have:
    - A title.
    - Content.
    - A creation date.
2. Implement the following endpoints:
    - **`GET /notes`**: Retrieve all notes.
    - **`POST /notes`**: Add a new note.
    - **`DELETE /notes/:id`**: Delete a specific note using its ID.
    - **`PUT /notes/:id`**: Update a specific note using its ID.
3. Connect your application to a MongoDB database and use Mongoose for object modeling.
4. Handle potential errors gracefully. If an error occurs, the API should return a suitable status code and a
   descriptive error message.

## Bonus Points

1. Implement a search feature: **`GET /notes/search?query=YOUR_QUERY`** that allows users to search notes by their title
   or content.
2. Paginate the **`GET /notes`** endpoint to return a limited number of notes at once, with the ability to fetch the
   next "page" of notes.

## Usage

### Running the Server

Ensure you have Node.js and MongoDB installed on your system.
Clone this repository and navigate to the project directory.

```bash 
git clone https://github.com/Mohammad-AbuJaber/note-keeping-api.git
```

```bash
cd note-keeping-api
```

Then, follow these steps:

1. Install dependencies:
   ```bash
   npm init -y
   ```
   ```bash
   npm install mongoose express body-parser
   ```
2. Start the MongoDB server:
   ```bash
    node server.js
    ```
3. Make requests to the API using a tool like Postman.

## Examples

1. Retrieve all notes
   ```bash
   GET http://localhost:3000/notes/
   ```
2. Retrieve note by id
    ```bash
    GET http://localhost:3000/notes/{the note's ID}
   ```
3. Add a new note
   ```bash
   POST http://localhost:3000/notes/
   ```
   Body:
    ```json
   {
   "title": "Note Title",
   "content": "Note Content"
   }
    ```
4. Delete a specific note using its ID
   ```bash
    DELETE http://localhost:3000/notes/{the note's ID}
    ```
5. Update a specific note using its ID
   ```bash
    PUT http://localhost:3000/notes/{the note's ID}
    ```
   Body:
    ```json
   {
   "title": "New Title",
   "content": "New Content"
   }
    ```
6. Search notes by their title or content
    ```bash
     GET http://localhost:3000/notes/search?query=YOUR_QUERY
     ```

7. Paginate the **`GET /notes`** endpoint to return a limited number of notes at once, with the ability to fetch the
   next "page" of notes.
    ```bash
     GET http://localhost:3000/notes/?page=1&limit=2
     ```

Feel free to contact me if you have any questions or suggestions.