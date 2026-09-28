# daisyUI 5 Guidelines

Official daisyUI component library rules and standards for this workspace.

## daisyUI 5 install notes
1. daisyUI 5 requires Tailwind CSS 4.
2. `tailwind.config.js` is deprecated in Tailwind CSS v4. Only `@import "tailwindcss";` and `@plugin "daisyui";` in CSS.

## daisyUI 5 usage rules
1. Add daisyUI component, part, and modifier classes directly.
2. Customize with Tailwind CSS utilities if daisyUI classes are not sufficient.
3. If CSS specificity issues arise, use `!` at the end (e.g. `bg-red-500!`). Use sparingly.
4. Flex and grid layouts must be responsive using Tailwind prefixes (`sm:`, `md:`, `lg:`).
5. Only use valid daisyUI class names or Tailwind CSS utility classes.
6. Use semantic colors (`primary`, `secondary`, `accent`, `neutral`, `base-100`, `base-200`, `base-300`, `base-content`, `info`, `success`, `warning`, `error`).
7. Avoid hardcoding text colors like `text-gray-800` on `bg-base-100` (breaks in dark mode). Always use semantic color tokens like `text-base-content`.
8. Always refer to the workspace skill in `.agents/skills/daisyui/SKILL.md` for complete component syntax and discovery protocol.
