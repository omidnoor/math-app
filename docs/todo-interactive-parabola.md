## Quadratics Micro-App Master TODO

### Graph & Interaction Layer
- [x] Remove legacy D3 implementation and related dependencies.
- [x] Build a React-native graph module with smooth vertex dragging.
- [ ] Recreate ancillary controls (sliders, parameter locks, info panels) using the new component API.

### Lesson Content Pipeline
- [x] Author lesson objects for **L2–L9** in `src/data/lessons.ts` (forms, solving, discriminant, modeling, inequalities, data fit).
- [x] Add English instructional strings for new lessons to `translations.ts`.
- [x] Add Chinese translations for the same instructional strings (ensure i18n coverage).
- [x] Include hinge questions, modeling prompts, and success criteria per lesson (per design spec).

### Student Experience
- [x] Add end-of-lesson summary card with reflection prompt and success criteria recap.
- [x] Provide navigation CTA (e.g., “Next Lesson”) sourced from lesson ordering.
- [x] Ensure Interactive components referenced in each lesson are available or gracefully stubbed.

### Teacher Experience
- [ ] Surface new lesson metadata and hinge items in `TeacherDashboard`.
- [ ] Add download/resource placeholders for new lessons (packets, slides, rubrics).

### QA & Polish
- [ ] Regression check lesson flows, translations, and assessment widgets.
- [ ] Run lint/tests and prune any now-unused helpers after verification.
- [ ] Document residual gaps or future enhancements back in this checklist.
