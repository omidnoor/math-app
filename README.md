# Quadratics Learning Platform

A learner-centered, mastery-oriented micro-app that teaches quadratic functions through multiple representations, guided discovery, and authentic modeling tasks.

## Features

### Core Pillars
- **Modern Pedagogy**: UDL, 5E/GI inquiry arc, formative checks, explicit success criteria, retrieval practice
- **Multiple Representations**: Algebra ↔ Graph ↔ Table ↔ Verbal context
- **Tool Choice**: Structured decision tree for solving methods
- **Modeling**: Projectile motion, revenue optimization, fencing problems
- **i18n**: On-click Chinese tooltips for all instructional text

### Interactive Components
- **D3.js Graphs**: Draggable parabolas, projectile motion animations, real-time parameter updates
- **KaTeX Equations**: Beautiful, fast-rendering mathematical notation
- **Bilingual Support**: English instruction with click-to-reveal Chinese translations
- **Formative Assessment**: Hinge questions with instant feedback and targeted error notes
- **UDL Accessibility**: Keyboard navigation, WCAG-AA compliance, screen reader support

## Lesson Sequence

1. **L1: Transformations & Features** - Vertex form, axis of symmetry, range
2. **L2: Forms & Conversions** - Standard, vertex, and intercept forms
3. **L3: Solving I** - Square root and factoring methods
4. **L4: Solving II** - Completing the square and quadratic formula
5. **L5: Discriminant** - Predicting root types from b² - 4ac
6. **L6: Modeling I** - Projectile motion with h(t) = -½gt² + v₀t + h₀
7. **L7: Modeling II** - Revenue optimization and fencing problems
8. **L8: Inequalities** - Sign charts and line-parabola intersections
9. **L9: Data Fit** - Fitting quadratics to data and performance task

## Tech Stack

- **Framework**: Next.js 15 with TypeScript and Turbopack
- **Styling**: Tailwind CSS
- **Graphs**: D3.js v7+
- **Equations**: KaTeX
- **i18n**: Custom translation system with tooltip support

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── lessons/[id]/      # Dynamic lesson pages
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── TranslatableText.tsx
│   ├── Equation.tsx
│   ├── ParabolaGraph.tsx
│   ├── ProjectileGraph.tsx
│   ├── HingeQuestion.tsx
│   └── LessonCard.tsx
├── data/                  # Lesson content and data
│   └── lessons.ts
├── lib/                   # Utilities and configurations
│   └── translations.ts    # i18n translations (en/zh)
└── types/                 # TypeScript type definitions
    └── index.ts
```

## Usage

### Student Mode
- Browse all 9 lessons from the home page
- Click any lesson card to start learning
- Interact with graphs by dragging vertices or adjusting sliders
- Answer hinge questions to check understanding
- Click any instructional text to see Chinese translation

### Teacher Mode
- Access hinge questions and misconception probes
- View rubrics and exemplar student work
- Export lesson materials for classroom use

## Accessibility

- Full keyboard navigation
- WCAG-AA color contrast
- Screen reader compatible
- Dyslexia-friendly typography option
- Click-to-translate tooltips

## Pedagogical Features

### Assessment Types
- **Formative**: Hinge questions, exit tickets, mini-whiteboard shares
- **Summative**: Mixed-method quiz + performance task with analytic rubric
- **Feedback**: Instant correctness checks with targeted "fix-it" micro-lessons

### Rubric Dimensions
1. **Concepts**: Identifies features, forms, and graph-algebra links
2. **Methods**: Chooses and executes appropriate solving tools
3. **Reasoning**: Interprets models with units, domain, and feasibility
4. **Communication**: Clear math writing, labeled graphs, correct notation

## License

Educational use only. See design spec in `docs/app-direction.md` for full details.

## Credits

Built with modern pedagogy principles and UDL accessibility in mind.
Powered by Next.js, D3.js, and KaTeX.
