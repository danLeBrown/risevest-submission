# Risevest Submission

## Prerequisites

- A Docker installation on your machine.
- Visual Studio Code
- Basic knowledge of Node.js and Docker concepts.

## Description

This project meets the following requirements:

**Database Design & Setup:**

- A database with three tables: Users, Posts, and Comments. Users can have multiple posts, and each post can have multiple comments.
- Implement necessary indexing for anticipated query performance.

**API Design & Implementation:**

Endpoints to:

- Create and retrieve users.

  - `POST /users`
  - `GET /users`

- Create a post for a user and retrieve all posts of a user (/users/:id/posts).

  - `POST /users/:id/posts`
  - `GET /users/:id/posts`

- Add a comment to a post (/posts/:postId/comments).

  - `POST /posts/:postId/comments`

- Solves the Performance Challenge: Fetch the top 3 users with the most posts and, for each of those users, the latest comment they made. This should be achieved with efficient querying.

## Setup Locally

- Clone the repository
- Run:

```bash
Run:
docker-compose up -d # to start the application and its dependencies
```

## Testing

This project relies on End-to-end (E2E) tests, which can be run with:

```bash
npm install
npm run test:e2e
# docker-compose exec risevest npm run test:e2e (testing cannot be done in docker container successfully yet)
```

## Development

- To generate new routes after updating the controllers, run:

```bash
npm run route:generate
```

- To create a new migration file after updating the models (or not), run:

```bash
npm run migration:create --name=your-migration-name
```
