# NALA Menu Manager

NALA Menu Manager is a browser app I built for the MAST5112 Portfolio of Evidence. It gives restaurant staff a simple way to browse a menu, find dishes, keep item details up to date, and check a few useful pricing and availability figures.

The app is built with React, TypeScript, and Vite. It runs in a web browser; it is not a React Native or Expo app.

## Project details

| | |
|---|---|
| Student | Hlompho Muzi Xolo |
| Student number | ST10476575 |
| Module | MAST5112 — Portfolio of Evidence |
| Repository | [44Xolo/NALA-ASSIGNMENT-1](https://github.com/44Xolo/NALA-ASSIGNMENT-1) |
| Demo | [Watch the app demo](https://youtube.com/shorts/nESHh-IQ8Hs?feature=share) |

## What you can do

- Browse the sample dishes and open any item to see its details.
- Search by dish name and filter the list by course.
- Add and edit dishes, including their availability, with form validation.
- Delete a dish after confirming, or undo the deletion.
- Restore the original sample menu.
- Review menu totals, average prices, prices by course, availability, and the least and most expensive dishes.
- Keep menu changes in local browser storage on the same device.

## Run the app

Install [Node.js](https://nodejs.org/) and npm, then run:

```sh
npm install
npm run dev
```

Open the local address printed by Vite. The layout is designed for both narrow and desktop browser screens.

## Run the checks

```sh
npm run typecheck
npm test
npm run build
```

The tests cover menu search and filtering, statistics, saved menu data, and form validation.

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

Menu data and the sign-in name are saved in the browser's local storage. They are only available in that browser on that device; the app does not sync data between users or devices. The sign-in screen saves a name to personalise the greeting, but it is not account authentication. If browser storage is unavailable, the app continues for the current session and logs a warning in the browser console.

This project does not include ordering, a cart, a backend, or React Native screens. You cannot upload photos for new menu items.

## Change log

These are the main changes made since Part 2:

- **14 November 2026:** Added editing and deletion, with validation, a confirmation step, and immediate updates.
- **14 November 2026:** Added dish-name search and course filtering, including a clear button.
- **14 November 2026:** Added menu totals, average price, and item counts by course.
- **16 November 2026:** Added undo for deleted dishes and an option to restore the sample menu.
- **16 November 2026:** Added average prices by course, availability figures, and lowest and highest prices.
- **16 November 2026:** Added automated tests for search, filtering, statistics, and form validation.
- **14–16 November 2026:** Improved validation and feedback messages, and clarified empty states.
- **14 November 2026:** Reworked the project into strict TypeScript and separated components, screens, hooks, utilities, and data.
- **16 November 2026:** Converted configuration files to TypeScript and removed `.env` and generated build files from Git.
- Removed the cart, ordering pages, Settings, and Google sign-in from the Part 2 prototype because they are outside the final brief.

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
