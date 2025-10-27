# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SmartFlow is a SaaS platform for freelancers and micro-entrepreneurs to create and manage quotes, invoices, and deposits. It automates repetitive tasks, accelerates billing, and optimizes payment tracking. The project uses a monorepo structure with a NestJS backend and Next.js frontend.

## Development Commands

### Backend (NestJS)
```bash
cd backend && npm run start:dev    # Development server with watch mode
cd backend && npm run build        # Production build
cd backend && npm run lint         # Lint and fix code
cd backend && npm run test         # Run all unit tests
cd backend && npm run test:watch   # Run tests in watch mode
cd backend && npm run test:e2e     # Run end-to-end tests
cd backend && npm run test:cov     # Run tests with coverage
cd backend && npm run test -- --testNamePattern="test name"  # Run specific test
```

**Package Manager Note**: Backend README shows `pnpm` but package-lock.json indicates `npm` is used. Use `npm` for consistency.

### Database (Prisma)
```bash
cd backend && npx prisma generate          # Generate Prisma client after schema changes
cd backend && npx prisma migrate dev       # Create and apply migrations in development
cd backend && npx prisma migrate dev --name <migration_name>  # Create named migration
cd backend && npx prisma migrate deploy    # Apply migrations in production
cd backend && npx prisma studio            # Open Prisma Studio (database GUI)
cd backend && npx prisma db push           # Push schema changes without migrations (dev only)
cd backend && npx prisma db seed           # Run database seed scripts
```

**Database Setup**: Configure `DATABASE_URL` in `backend/.env` before running migrations. Default is PostgreSQL, but MySQL and SQLite are also supported (see `.env` for examples).

### Frontend (Next.js)
```bash
cd frontend && npm run dev         # Development server (port 3000)
cd frontend && npm run build       # Production build
cd frontend && npm run start       # Start production server
cd frontend && npm run lint        # Lint code
```

### API Documentation (Swagger)
Once the backend is running, Swagger documentation is available at:
- **URL**: `http://localhost:4000/api`
- Interactive API testing and documentation via Swagger UI
- All endpoints automatically documented with request/response schemas
- **Note**: Backend runs on port 4000 (frontend uses 3000)

## Architecture

### Backend Architecture

**Framework**: NestJS v11 with TypeScript (strict mode enabled)

**Database**: Prisma ORM with PostgreSQL (configurable for MySQL/SQLite)

**Current State**: Early-stage MVP with database schema and first API module
- Swagger API documentation configured at `/api`
- Parametres API module implemented (CRUD operations for configuration settings)
- Prisma schema configured with complete data model (Clients, Devis, Factures, Paiements)
- Global validation pipes and CORS enabled
- No authentication/authorization implemented yet
- Ready for additional feature module expansion

**Structure**:
```
backend/
├── src/
│   ├── main.ts              # Application bootstrap (port 4000, Swagger setup)
│   ├── app.module.ts        # Root module (imports PrismaModule, ParametresModule)
│   ├── app.controller.ts    # HTTP request handlers
│   ├── app.service.ts       # Business logic layer
│   ├── prisma/
│   │   ├── prisma.module.ts    # Global Prisma module
│   │   └── prisma.service.ts   # Prisma client service
│   └── parametres/
│       ├── parametres.module.ts
│       ├── parametres.controller.ts
│       ├── parametres.service.ts
│       └── dto/
│           ├── create-parametres.dto.ts
│           └── update-parametres.dto.ts
├── prisma/
│   └── schema.prisma        # Database schema with all models
├── prisma.config.ts         # Prisma configuration with dotenv
└── .env                     # Database connection string
```

**Data Models** (defined in `prisma/schema.prisma`):
- **Client**: Customer information with contact details and tax identifiers
- **Devis**: Quotes with electronic signature support and pricing types (FORFAIT, TJM, FONCTIONNALITE, MIXTE)
- **LigneDevis**: Quote line items
- **Facture**: Invoices (both ACOMPTE and FINALE types) with payment tracking
- **LigneFacture**: Invoice line items
- **Paiement**: Payment records with multiple payment methods
- **Parametres**: Application settings and company information

**Key Patterns**:
- Module pattern with `@Module()` decorator for feature organization
- Dependency injection via constructor injection
- Controller/Service separation for request handling and business logic
- Prisma Client for type-safe database access
- Test files use `*.spec.ts` naming convention

**Prisma Usage**:
- PrismaService is globally available via `@Global()` decorator
- Inject in services: `constructor(private prisma: PrismaService) {}`
- Type-safe database access: `this.prisma.parametres.findMany()`
- Run `npx prisma generate` after schema changes to update types
- See `src/prisma/prisma.service.ts` and `src/parametres/parametres.service.ts` for examples

**API Documentation (Swagger)**:
- Swagger UI available at `http://localhost:4000/api` when backend is running
- All endpoints documented with `@Api*` decorators from `@nestjs/swagger`
- DTOs use `class-validator` decorators for validation
- Request validation enabled globally via `ValidationPipe` in `main.ts`
- Example module: `src/parametres/` with full CRUD operations

**Implemented API Endpoints**:
- `POST /parametres` - Create new configuration settings
- `GET /parametres` - Get all configuration settings
- `GET /parametres/first` - Get the first configuration (main settings)
- `GET /parametres/:id` - Get configuration by ID
- `PATCH /parametres/:id` - Update configuration
- `DELETE /parametres/:id` - Delete configuration

**Testing**: Jest configured with ts-jest, rootDir set to `src/`, test regex `.*\.spec\.ts$`

### Frontend Architecture

**Framework**: Next.js 16 with App Router, TypeScript, and Tailwind CSS v4

**Current State**: Single-page dashboard with tab-based navigation
- Uses mock data from `lib/data.ts` (no backend integration yet)
- Client-heavy approach with most components marked `'use client'`
- Mobile-responsive with collapsible sidebar

**Structure**:
```
frontend/
├── app/
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx         # Main dashboard (tab state management)
│   └── globals.css      # CSS variables and Tailwind imports
├── components/
│   ├── ui/              # Shadcn/ui primitives (17 components)
│   ├── layout/          # Sidebar, Header (navigation)
│   └── dashboard/       # Feature components (9 tab views)
├── lib/
│   ├── utils.ts         # cn() utility for class merging
│   └── data.ts          # Mock data for development
└── hooks/
    └── use-theme.ts     # Theme switching with localStorage
```

**UI Components**: Built on Shadcn/ui + Radix UI primitives
- 17 base UI components (button, card, tabs, input, select, etc.)
- Class-Variance-Authority for component variants
- Lucide React for icons

**Styling**:
- Tailwind CSS v4 with PostCSS integration
- CSS variables using OKLCH color space
- Dark mode with `.dark` class selector
- Utility: `cn()` from `lib/utils.ts` for class composition

**State Management**: React hooks only (no global state)
- `useState` for tab selection, sidebar state, mobile detection
- `useEffect` for responsive breakpoints and theme persistence
- Custom hook: `useTheme()` for dark mode

**Path Alias**: `@/*` maps to frontend root directory

**Dashboard Tabs**: Overview, Quotes, Invoices, Clients, Projects, Payments, Expenses, Reports, Settings (most marked "coming soon")

## Code Style

### General
- Single quotes for strings
- Trailing commas required
- Prettier formatting enforced
- TypeScript strict mode enabled in both frontend and backend

### Backend (NestJS)
- Use decorators: `@Controller()`, `@Injectable()`, `@Module()`, `@Get()`, etc.
- Constructor-based dependency injection pattern
- Test files: `*.spec.ts` in same directory as source
- ESLint configured to allow `any` type but warns on floating promises
- **Swagger decorators**: Use `@ApiTags()`, `@ApiOperation()`, `@ApiResponse()`, `@ApiProperty()`, etc.
- **Validation**: DTOs must use `class-validator` decorators (`@IsString()`, `@IsEmail()`, etc.)
- **Swagger DTOs**: Use `@ApiProperty()` for required fields, `@ApiPropertyOptional()` for optional
- **Partial DTOs**: Use `PartialType()` from `@nestjs/swagger` for update DTOs

### Frontend (Next.js)
- React functional components with hooks
- Client components require `'use client'` directive
- Tailwind CSS for styling (use `cn()` utility from `@/lib/utils`)
- Components should have strongly typed props interfaces
- Use Radix UI primitives for accessible UI components

### Error Handling
- Backend: Use NestJS built-in exception filters (`HttpException`, `BadRequestException`, etc.)
- Frontend: Implement error boundaries and try-catch blocks for async operations

## Important Notes

- **Monorepo Structure**: Backend and frontend are separate npm projects with independent dependencies
- **No Backend Integration**: Frontend currently uses mock data; API integration pending
- **Database Schema**: Prisma schema fully defined but no migrations run yet - configure DATABASE_URL and run `npx prisma migrate dev` to set up database
- **API Development**: Backend has Parametres API implemented as reference; ready to add more feature modules (clients, devis, factures)
- **Swagger Documentation**: All API endpoints documented at `/api` - use as reference for frontend integration
- **Tab-Based Navigation**: Frontend uses client-side tabs instead of traditional Next.js routing
- **Component Library**: Uses Shadcn/ui (configured in `components.json`) - components can be added via shadcn CLI
- **Testing**: Backend has Jest setup; frontend has no test configuration yet
- **Environment Variables**: Backend requires `.env` file with DATABASE_URL (template provided in `.env`)
- **Validation**: Global validation enabled - all DTOs are validated automatically using class-validator
