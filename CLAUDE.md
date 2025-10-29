# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Budget & Warranty Management Application** - a visual, interactive financial management platform combining budget analysis, intelligent receipt scanning, modern spreadsheet functionality, and warranty tracking.

**Core Features:**
- Customizable dashboard with draggable/resizable widgets (React Grid Layout)
- Receipt scanner using OCR (Mindee / Google Vision / Tesseract) to extract transaction data
- Excel-like spreadsheet interface (AG Grid / Handsontable) with automatic data population
- Warranty management system with automatic expiration notifications
- Visual data analysis and categorization

**Language:** French (UI, documentation, and user-facing content should be in French)

## Tech Stack

**Current Implementation:**
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4, shadcn/ui components
- **Animations:** Framer Motion for sidebar and transitions
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge (cn helper)
- **Dashboard:** React Grid Layout (fully implemented with drag & drop)
- **State Management:** React Context API (WidgetContext, NotificationContext)
- **Notifications:** Custom toast system with notification center

**Planned Technologies:**
- **Backend:** Supabase / Firebase / NestJS
- **OCR:** Mindee / Google Vision API
- **Storage:** Supabase Storage / Cloudinary
- **Notifications:** OneSignal / Firebase Cloud Messaging

## Project Structure

```
budget-app/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Dashboard with drag & drop
│   ├── scan/                # Receipt scanner page
│   ├── tableur/             # Spreadsheet page
│   ├── garanties/           # Warranties page
│   └── globals.css          # Global styles
├── components/
│   ├── dashboard/           # Dashboard components
│   │   ├── DraggableDashboard.tsx  # Grid layout with drag & drop
│   │   └── DashboardControls.tsx   # Edit/customize controls
│   ├── layout/              # Layout components
│   │   ├── Sidebar.tsx      # Collapsible sidebar with notifications
│   │   ├── NotificationBell.tsx    # Notification dropdown
│   │   └── DashboardLayout.tsx     # Main wrapper
│   ├── widgets/             # Dashboard widgets
│   │   ├── BaseWidget.tsx
│   │   ├── SoldeWidget.tsx
│   │   ├── CategoriesWidget.tsx
│   │   ├── GarantiesWidget.tsx
│   │   └── RecentTransactionsWidget.tsx
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── toast.tsx
│       └── ...
├── contexts/                # React contexts
│   ├── WidgetContext.tsx    # Widget state management
│   └── NotificationContext.tsx  # Notifications & toasts
├── hooks/                   # Custom hooks
│   └── useWarrantyAlerts.ts # Warranty expiration alerts
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript definitions
└── public/                  # Static assets
```

## Key Architecture Considerations

**Widget System:**
- Built with react-grid-layout for drag & drop functionality
- Widget state managed via WidgetContext
- Edit mode toggle enables dragging/resizing
- Widget visibility can be toggled independently
- Positions persist across page reloads (currently in-memory, integrate with backend)
- 12-column grid layout with auto-stacking

**OCR Pipeline:**
- Receipt image → OCR service → structured JSON → manual validation → database
- Separate pipelines for transaction receipts vs warranty receipts
- Store both original images and extracted data

**Data Models:**
- **Transaction:** Store, Date, Category, Items[], Total, Currency
- **Warranty:** Store, Product, Purchase Date, Warranty Duration, Expiration Date, Amount, Serial Number, Status
- **Widget Config:** Type, Position, Size, Settings

**Notification System:**
- Custom toast notifications (auto-dismiss after 5 seconds)
- Notification center in sidebar with unread count badge
- Warranty expiration alerts (30, 7, and 0 days before expiration)
- Hook-based alert system (useWarrantyAlerts)
- Support for multiple notification types (warning, success, error)
- Notifications managed via NotificationContext

## Development Commands

**Setup:**
```bash
npm install                    # Install all dependencies
```

**Development:**
```bash
npm run dev                    # Start dev server with Turbopack (http://localhost:3000)
npm run build                  # Create production build
npm run start                  # Start production server
npm run lint                   # Run ESLint
```

**Adding shadcn/ui Components:**
```bash
npx shadcn@latest add button   # Add specific component
npx shadcn@latest add card     # Add card component
```

**Component Guidelines:**
- All UI text should be in French
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Follow the shadcn/ui component patterns
- Widgets should extend `BaseWidget` for consistency
- Use Framer Motion for smooth animations

## Security & Privacy

- Encrypt sensitive data (AES-256 + HTTPS)
- Support PIN / biometric authentication
- Ensure receipt images with personal data are securely stored
- Export functionality for user data portability
