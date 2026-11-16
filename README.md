# NALA Menu Manager

NALA Menu Manager is a responsive browser app for maintaining a restaurant menu. Staff can browse dishes, search and filter the menu, update availability, manage menu items, and review basic pricing statistics.

This project was built for the MAST5112 Portfolio of Evidence. It uses React, TypeScript, and Vite; it is a web app, not a React Native or Expo app.

## Project details

| | |
|---|---|
| Student | Hlompho Muzi Xolo |
| Student number | ST10476575 |
| Module | MAST5112 — Portfolio of Evidence |
| Repository | [44Xolo/NALA-ASSIGNMENT-1](https://github.com/44Xolo/NALA-ASSIGNMENT-1) |
| Demo | [Watch the app demo](https://youtube.com/shorts/nESHh-IQ8Hs?feature=share) |

## What the app can do

- Browse the sample menu and open a dish for its details.
- Search by dish name and filter by course.
- Add, edit, and delete menu items, with validation and a confirmation before deletion.
- Undo a deletion and restore the original sample menu.
- View menu totals, average prices, availability, and price ranges.
- Save menu changes in the browser so they remain available on the same device.

## Run locally

Install [Node.js](https://nodejs.org/) and npm, then run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The layout is designed to work on both narrow and desktop browser screens.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

The test suite covers menu search and filtering, statistics, and form validation.

## Project structure

```text
src/
  components/  Shared interface components
  data/        Sample menu data
  hooks/       Menu state and filtering
  screens/     Menu, detail, form, management, and statistics views
  utils/       Formatting, filtering, statistics, and validation
  types.ts     Shared TypeScript types
public/images/ Dish and restaurant images
```

## Data and limitations

Menu data and the sign-in name are stored in the browser's local storage. They are not shared across browsers or devices. The sign-in screen is a convenience for personalising the greeting; it does not provide account authentication. If browser storage is unavailable, the app continues for the current session and logs a warning in the browser console.

This version does not include ordering, a cart, a backend, or React Native screens. New menu items do not support photo uploads.

## References

- Boduch, A. and Derks, R. (2023). *React and React Native: Build cross-platform JavaScript applications with native power for mobile, web and desktop*. 4th ed. Packt Publishing.
- Eisenberg, A. (2022). *Learning React Native: Building Native Mobile Apps with JavaScript*. 2nd ed. O'Reilly Media.
- React Native. [Documentation](https://reactnative.dev/docs/getting-started). Accessed 12 October 2026.
- Google. [Material Design 3](https://m3.material.io/). Accessed 12 October 2026.
- Apple. [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/). Accessed 12 October 2026.
- Figma. [Figma](https://www.figma.com/). Accessed 12 October 2026.
- diagrams.net. [Diagramming and whiteboarding](https://www.diagrams.net/). Accessed 12 October 2026.
- Walker, J. R. (2021). *The Restaurant: From Concept to Operation*. 8th ed. Wiley.
- Biørn-Hansen, A., Grønli, T. and Ghinea, G. (2020). 'A survey and taxonomy of core concepts and research challenges in cross-platform mobile development'. *ACM Computing Surveys*, 53(5), pp. 1–39.
