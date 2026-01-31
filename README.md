# Forge

A production-ready Next.js 16 monorepo boilerplate for shipping full-stack applications fast.

## Status

**Pre-alpha** - Under active development. Not yet ready for production use.

## Features

- **Monorepo Architecture** - Turborepo + pnpm workspaces
- **Design System** - 40+ components built on Radix UI primitives with Tailwind CSS v4 and Framer Motion
- **Authentication** - Better Auth with email/password and OAuth support
- **Database** - Drizzle ORM with PostgreSQL (Neon-optimized)
- **Type-Safe API** - tRPC with React Query integration
- **Icons** - Font Awesome (solid, regular, brands)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: Radix UI + Tailwind CSS v4 + CVA
- **Animations**: Framer Motion with AnimationProvider context
- **Auth**: Better Auth
- **Database**: Drizzle ORM + PostgreSQL
- **Package Manager**: pnpm

## Project Structure

```
forge/
├── apps/
│   └── web/              # Next.js application
├── packages/
│   ├── ui/               # Design system components
│   ├── auth/             # Authentication (Better Auth)
│   ├── db/               # Database layer (Drizzle)
│   ├── utils/            # Shared utilities
│   └── config/           # Shared configurations
└── turbo.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (or Neon account)

### Installation

```bash
# Clone the repository
git clone https://github.com/southwellmedia/forge.git
cd forge

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

See `.env.example` for required environment variables.

## Development

```bash
pnpm dev          # Start dev server
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm typecheck    # TypeScript checking
pnpm db:studio    # Open Drizzle Studio
```

## Packages

### `@repo/ui`

Fully customizable component library with:
- Layout: Container, Stack, Divider
- Forms: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider
- Data Display: Card (10+ variants), Badge, Avatar, Progress, Skeleton
- Feedback: Toast, Alert, Dialog, Sheet
- Navigation: Tabs, Breadcrumb, Pagination, DropdownMenu, Command
- Animations: Fade, Slide, Stagger, PageTransition

### `@repo/auth`

Better Auth integration with:
- Email/password authentication
- OAuth providers (Google, GitHub)
- Session management
- Data Access Layer helpers

### `@repo/db`

Drizzle ORM setup with:
- User, Session, Account schemas
- Type-safe queries
- Migration support

## Roadmap

### Pre-alpha (Current)
- [x] Monorepo setup
- [x] Core UI components
- [x] Authentication
- [x] Database layer
- [x] tRPC setup

### Alpha
- [ ] Email system (Resend)
- [ ] File uploads
- [ ] Testing setup (Vitest + Playwright)
- [ ] Documentation site

### Beta
- [ ] CLI tool (create-forge-app)
- [ ] Admin dashboard template
- [ ] Stripe integration
- [ ] Real-time features

## License

MIT

## Credits

Built by [Southwell Media](https://southwell.media)
