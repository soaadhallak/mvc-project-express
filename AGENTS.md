# Project Context

## Stack
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Zod validation

## Architecture Rules

- Controllers should not contain business logic.
- Validation must happen using middleware before controllers.
- Database access should use Prisma only.
- Never use raw SQL without review.

## Testing Rules

- Every new endpoint requires tests.
- Tests should verify behavior, not implementation details.

## Security Rules

- Validate all user input.
- Avoid returning sensitive fields.
- Add pagination for list endpoints.
