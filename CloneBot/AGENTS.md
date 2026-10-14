# CloneBot architecture

Follow this structure for future work in this repository. The application package is in `CloneBot/`, and its source is in `CloneBot/src/`.

## Source organization

- `src/components/elements/` contains small reusable controls such as `Button`, `Card`, and `Switch`. Keep each component in its own named folder and use the existing elements barrel where appropriate.
- `src/components/ui/` contains composed interface components such as `Brand`, `Header`, `Setting`, and dialogs. Export shared UI components through `src/components/ui/index.ts`.
- `src/views/` contains page-level screens, organized into named feature folders. Keep screen composition and screen-specific behavior in the view.
- `src/utils/types/` contains types shared across features. Keep component-only types beside their component when that adds value.
- Keep mock content in `src/data/`, browser persistence helpers in `src/services/`, and app-level routing/state composition in the existing app entry points.

## Styling and dependencies

- Preserve CloneBot's current React, TypeScript, and Vite setup and its existing global CSS in `src/style.css`.
- The YouTube Clone architecture document is a guide to separation of responsibilities, not authorization to migrate CloneBot to Styled Components, Redux, React Router, Firebase, Axios, or TanStack Query. Add or replace dependencies only when a requested feature needs them.
- Reuse existing CSS classes and behavior. Add separate style files only if CloneBot adopts a component-scoped styling convention or a task specifically requires it.

## Change workflow

- Inspect the current source and imports before moving or creating files; preserve established names and behavior.
- Put new code in the layer matching its responsibility. Avoid duplicate components, unnecessary abstractions, placeholder directories, and unrelated restructuring.
- Update imports and the relevant barrel when moving components. Keep `App.tsx` focused on application orchestration.
- For implementation work, run the production build when practical and report any checks that could not be completed.
