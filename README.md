# Task Management API

This is a backend API built with Express.js and MongoDB to facilitate the management of tasks and subtasks for users within an application. The API supports CRUD operations (Create, Retrieve, Update, Delete) on tasks and their associated subtasks. It ensures that any deleted tasks or subtasks are excluded from the GET API responses without affecting CRUD operations.

## High-Level Overview

### User Record Separation

Each user has a dedicated record within the database to store their tasks and subtasks. All tasks and their corresponding subtasks for a user are saved within the same user record.

### Soft Deletion Handling

Records marked for deletion remain intact within the database and are excluded from GET API responses without being permanently removed.

### Project Structure

- **`app.js`**: The main entry point of the application. Sets up the Express server, connects to MongoDB, and includes the Swagger documentation.
- **`controllers/taskController.js`**: Contains the logic for handling CRUD operations for tasks and subtasks.
- **`models/User.js`**: Defines the MongoDB schemas and models for users, tasks, and subtasks.
- **`routes/tasks.js`**: Defines the routes for the API endpoints.
- **`swagger.yml`**: Contains the Swagger (OpenAPI) specification for the API documentation.

# API Endpoints Documentation

## Listing Tasks with Subtasks

### Endpoint

- **GET /tasks**
  - Retrieves all tasks along with their associated subtasks for a user.
  - Tasks or subtasks marked as deleted are excluded from the response.

## Adding a New Task

### Endpoint

- **POST /tasks**
  - Creates a new task for a user.

## Editing a Task

### Endpoint

- **PUT /tasks/:taskId**
  - Updates an existing task identified by `taskId`.

## Deleting a Task

### Endpoint

- **DELETE /tasks/:taskId**
  - Deletes a task identified by `taskId` by marking it as deleted in the database.

## Listing Subtasks for a Task

### Endpoint

- **GET /tasks/:taskId/subtasks**
  - Retrieves all non-deleted subtasks associated with a specific task identified by `taskId`.

## Updating Subtasks for a Task

### Endpoint

- **PUT /tasks/:taskId/subtasks**
  - Updates the list of subtasks for a task identified by `taskId`.

## Swagger API Documentation

### Endpoint

- **GET /api-docs**
  - Provides Swagger documentation for all available API endpoints.
  - Access this endpoint after starting the server to view the Swagger UI and explore the API interactively.

# Database Schema Documentation

## User Collection

### Schema

| Field   | Type       | Required | Description                                 |
| ------- | ---------- | -------- | ------------------------------------------- |
| `_id`   | `ObjectId` | `true`   | Unique identifier for the user.             |
| `name`  | `String`   | `true`   | The name of the user.                       |
| `email` | `String`   | `true`   | The email address of the user.              |
| `tasks` | `Array`    | `false`  | An array of tasks associated with the user. |

## Task Collection

### Schema

| Field      | Type       | Required | Description                                                |
| ---------- | ---------- | -------- | ---------------------------------------------------------- |
| `_id`      | `ObjectId` | `true`   | Unique identifier for the task.                            |
| `subject`  | `String`   | `true`   | The subject or title of the task.                          |
| `deadline` | `Date`     | `true`   | The deadline for completing the task.                      |
| `status`   | `String`   | `true`   | The status of the task (e.g., "in-progress", "completed"). |
| `deleted`  | `Boolean`  | `true`   | Indicates if the task is flagged as deleted.               |
| `subtasks` | `Array`    | `false`  | An array of subtasks associated with the task.             |

## Subtask Schema

### Schema

| Field      | Type       | Required | Description                                                   |
| ---------- | ---------- | -------- | ------------------------------------------------------------- |
| `_id`      | `ObjectId` | `true`   | Unique identifier for the subtask.                            |
| `subject`  | `String`   | `true`   | The subject or title of the subtask.                          |
| `deadline` | `Date`     | `true`   | The deadline for completing the subtask.                      |
| `status`   | `String`   | `true`   | The status of the subtask (e.g., "in-progress", "completed"). |
| `deleted`  | `Boolean`  | `true`   | Indicates if the subtask is flagged as deleted.               |

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
