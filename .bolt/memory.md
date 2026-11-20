# Project memory

## Product intent & audience

- OpenPath is an employer-facing DEI / fairness dashboard.
- Features are built by multiple developers in parallel, each owning a feature folder under `src/features/`.
- Current feature: Inclusive Hiring / Job Description Analysis — helps employers write more inclusive job postings via transparent rule-based wording review (not legal compliance, not a full AI bias audit).

## Brand personality & voice

- Professional, premium employer-tool tone.
- Transparent and educational: explains *why* wording excludes, offers inclusive alternatives.
- Clear disclaimers when scope is limited (e.g. "preliminary wording review, not legal compliance").

## Visual design & UX direction

- Premium employer dashboard aesthetic: professional cards, score indicators/rings, severity badges, clear warning indicators.
- Matches an existing OpenPath design system with tokens in `index.css` (consult before styling new components).
- Fully responsive layouts; keyboard-accessible controls (real focusable buttons, labelled inputs).
- Prefer reusable sub-components per feature folder (e.g. `ScoreGauge`, `FindingCard`, `RevisedDescriptionCard`).
- Inline highlighting of flagged phrases in analyzed text is an expected pattern.

## Decisions, constraints & rationale

- Framework: Vite + React + TypeScript.
- Strict ownership boundary: do **not** modify App.tsx, sidebar, header, global CSS, or other existing components. Exception allowed only for the single import line in App.tsx needed to mount a feature's default export (precedent set by the "skills" teammate).
- Feature components must be **default exports** (e.g. `JobFairnessChecker` default export).
- No external paid APIs; no fake AI integrations. Use transparent rule-based demo logic.
- LocalStorage persistence pattern: save latest draft + last scan summary; support reset.
- Copy-to-clipboard and reset are required interactive affordances.
- `dangerouslySetInnerHTML` used safely: only escaped text + `<mark>` tags from our own logic, no user-controlled attributes.

## Open questions & assumptions

- Assuming the shared design system tokens in `index.css` are stable; if they change, feature styling may need re-sync.
- Assuming default-export import-line edits in App.tsx remain the accepted integration pattern for new features.
- Rule set is demo-level (6 rules); coverage of exclusionary language is not exhaustive — future expansion likely needed.
- No backend integration assumed; all logic runs client-side.