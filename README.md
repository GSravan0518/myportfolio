# Sravan Kumar Gummalla — Portfolio

A cinematic portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind CSS. The supplied portrait stays fixed behind the entire page; it is never replaced by a generated person or repeated as a profile card.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with script execution restricted, use `npm.cmd` in place of `npm`.

```sh
npm run lint
npm run build
npm start
```

The build downloads Outfit through `next/font/google`, then serves the font locally. The initial build needs access to Google Fonts.

## Visual architecture

An experimental studio direction: oversized Outfit lettering paired with an italic system serif, asymmetric composition, charcoal, ivory, and one champagne accent. A fixed photograph, directional vignette, and scroll-controlled shade maintain contrast without opaque section backgrounds. The layout alternates open editorial sections, a split journey, and a horizontal project sequence. Mobile uses a tighter portrait crop and vertical project layout.

- Home: the original three-line uppercase identity with a masked line reveal, plus a circular studio seal that rotates with the page.
- About: editorial statement and supporting copy, without a repeated portrait.
- Journey: three practice chapters with a scroll-drawn line. No unverified dates, employers, or credentials.
- Work: four large image scenes in a pinned horizontal sequence, with progress, previous/next controls, pointer lighting, perspective, and image skew/scale.
- Capabilities: four connected skill clusters with a readable static layout on touch devices.
- Contact: direct email, clipboard action, magnetic social/resume links, and an expandable email-draft form.

## Components and content

- `app/page.tsx`: server-rendered section composition.
- `app/globals.css`: palette, responsive layout, interaction states, and reduced-motion overrides.
- `components/PortfolioEnvironment.tsx`: the sole portrait, atmospheric light, depth, progress, and title entrance.
- `components/Navigation.tsx`: active sections and keyboard-operable mobile navigation.
- `components/ProjectGallery.tsx` / `ProjectCard.tsx`: server-rendered project content and client interaction shell.
- `components/ProjectRail.tsx`: measured horizontal scroll travel and keyboard focus synchronization.
- `components/StudioMotion.tsx`: scroll-driven rotating studio seal.
- `components/Journey.tsx`, `SkillsConstellation.tsx`, `Contact.tsx`: section interactions.
- `components/RevealHeading.tsx`, `Magnetic.tsx`, `StudioCursor.tsx`: shared motion primitives.
- `lib/portfolio.ts`: identity, contact information, portrait, resume, and project data.

Update the chapter copy in `Journey.tsx` when verified experience information is available. Skill groups live in `SkillsConstellation.tsx`.

## Behavior and performance

The original `public/Professionalpic.jpg` is preserved. Next Image preloads only the portrait and optimizes/lazy-loads project artwork. Server-rendered content passes through small interactive components. Pointer movement updates motion values instead of rerendering the page. There are no autoplay videos, WebGL scenes, or animation intervals.

Reduced-motion preferences disable portrait parallax, text displacement, pointer lighting, cursor effects, magnetic movement, and project tilt. The horizontal project sequence is enabled only with a fine pointer, a viewport at least 1000px wide and 740px tall, and no reduced-motion preference. Other configurations use vertical projects. A ResizeObserver measures the rail; keyboard focus brings the relevant project into view. Mobile navigation supports Escape, focus containment, scroll locking, and automatic closure at the desktop breakpoint.

The contact form opens a `mailto:` draft; it does not send email or store submissions. Project links that currently point to the GitHub profile are explicitly labeled as profile links. Replace those URLs in `lib/portfolio.ts` when project-specific repositories or demos are available.

## Validation

Run lint and the production build before deploying. Check desktop, tablet, and mobile layouts in a browser, including reduced motion, menu keyboard behavior, form validation, and clipboard fallback. Browser visual QA and Lighthouse scores require a browser-enabled environment; a successful build alone does not establish those results.
