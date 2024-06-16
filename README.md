# Task Management API

This is a backend API built with Express.js and MongoDB to facilitate the management of tasks and subtasks for users within an application. The API supports CRUD operations (Create, Retrieve, Update, Delete) on tasks and their associated subtasks. It ensures that any deleted tasks or subtasks are excluded from the GET API responses without affecting CRUD operations.

## High-Level Overview

### User Record Separation

Each user has a dedicated record within the database to store their tasks and subtasks. All tasks and their corresponding subtasks for a user are saved within the same user record.

### Soft Deletion Handling

Records marked for deletion remain intact within the database and are excluded from GET API responses without being permanently removed.

### API Endpoints

#### Task CRUD Operations

- **Create a Task:** `POST /tasks`
- **Get All Tasks for a User:** `GET /tasks/{username}`
- **Update a Task:** `PUT /tasks/{username}/{taskId}`
- **Soft Delete a Task:** `DELETE /tasks/{username}/{taskId}`

#### Subtask CRUD Operations

- **Create or Update Multiple Subtasks for a Task:** `POST /subtasks`
- **Get All Subtasks for a Task:** `GET /subtasks/{username}/{taskId}`
- **Update Multiple Subtasks for a Task:** `PUT /subtasks/{username}/{taskId}`
- **Soft Delete Multiple Subtasks for a Task:** `DELETE /subtasks/{username}/{taskId}`

### Project Structure

- **`app.js`**: The main entry point of the application. Sets up the Express server, connects to MongoDB, and includes the Swagger documentation.
- **`controllers.js`**: Contains the logic for handling CRUD operations for tasks and subtasks.
- **`models.js`**: Defines the MongoDB schemas and models for users, tasks, and subtasks.
- **`routes.js`**: Defines the routes for the API endpoints.
- **`swagger.yml`**: Contains the Swagger (OpenAPI) specification for the API documentation.

### Running the Application

#### Development

To run the application in development mode, use:

```bash
npm run dev
```

## Running with PM2

To run the project with PM2:

1. Install PM2 globally if not already installed:

   ```bash
   npm install -g pm2
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Start the project with PM2:

   ```bash
   pm2 start ecosystem.config.js
   ```
