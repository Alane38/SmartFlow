# SmartFlow Development Guidelines

## Build Commands

### Backend (NestJS)
- `cd backend && npm run build` - Build production
- `cd backend && npm run start:dev` - Development server
- `cd backend && npm run lint` - Lint and fix code
- `cd backend && npm run test` - Run all tests
- `cd backend && npm run test:watch` - Watch mode testing
- `cd backend && npm run test -- --testNamePattern="specific test"` - Run single test

### Frontend (Next.js)
- `cd frontend && npm run build` - Build production
- `cd frontend && npm run dev` - Development server
- `cd frontend && npm run lint` - Lint code

## Code Style

### General
- Use single quotes for strings
- Trailing commas required
- Prettier formatting enforced
- TypeScript strict mode enabled

### Backend (NestJS)
- Decorators for controllers, services, modules
- Dependency injection pattern
- Test files: `*.spec.ts`
- ESLint allows `any` type but warns on floating promises

### Frontend (Next.js)
- React functional components with hooks
- Tailwind CSS for styling
- Path aliases: `@/*` maps to root
- TypeScript strict mode enabled

### Error Handling
- Backend: Use NestJS built-in exception filters
- Frontend: Proper error boundaries and try-catch blocks