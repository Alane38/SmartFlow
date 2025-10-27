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

### Frontend (Next.js)
```bash
cd frontend && npm run dev         # Development server (port 3000)
cd frontend && npm run build       # Production build
cd frontend && npm run start       # Start production server
cd frontend && npm run lint        # Lint code
```

## Architecture

### Backend Architecture

**Framework**: NestJS v11 with TypeScript (strict mode enabled)

**Current State**: Early-stage MVP with minimal setup
- Single endpoint: `GET /` returning "Hello World!"
- No database or ORM configured yet
- No authentication/authorization implemented
- Ready for feature module expansion

**Structure**:
```
backend/src/
├── main.ts              # Application bootstrap (port 3000)
├── app.module.ts        # Root module (empty imports)
├── app.controller.ts    # HTTP request handlers
├── app.service.ts       # Business logic layer
└── app.controller.spec.ts  # Unit tests
```

**Key Patterns**:
- Module pattern with `@Module()` decorator for feature organization
- Dependency injection via constructor injection
- Controller/Service separation for request handling and business logic
- Test files use `*.spec.ts` naming convention

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
- **Early Development**: Backend has no database, auth, or feature modules yet
- **Tab-Based Navigation**: Frontend uses client-side tabs instead of traditional Next.js routing
- **Component Library**: Uses Shadcn/ui (configured in `components.json`) - components can be added via shadcn CLI
- **Testing**: Backend has Jest setup; frontend has no test configuration yet
