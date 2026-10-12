
# NALA: Luxury Fine-Dining Menu & Ordering App  

A refined black-and-gold mobile-first menu management and ordering app designed for **NALA**, a luxury French fine-dining restaurant. This app replaces the traditional paper menu, giving staff a faster, more reliable way to browse dishes, manage items, and place multi-dish orders directly from one cart.  

| | |
|---|---|
| **Name** | Hlompho Muzi Xolo |
| **Student Number** | ST10476575 |
| **Module Name** | MAST5112 (Portfolio of Evidence) |
| **Repository** | [https://github.com/44Xolo/NALA-ASSIGNMENT-1](https://github.com/44Xolo/NALA-ASSIGNMENT-1) |

---

## Demo Video  
 Watch the demo on YouTube: [https://youtube.com/shorts/nESHh-IQ8Hs?feature=share] 

---

## 1. Project Overview  

NALA is a fine-dining restaurant specializing in classic French cuisine. Previously, the menu was paper-based, which made updates slow, organization difficult, and information easy to misplace. This project introduces a digital solution that allows the owner, head chef, and kitchen staff to manage the menu seamlessly from a phone or tablet.  

The project consists of two parts:  
1. **Design** – documented in Word, including scenario analysis, annotated screen designs, flow diagrams, and component planning.  
2. **Working App** – a browser-based prototype (`nala-preview.html`) enhanced with drinks, a multi-dish cart, a Settings page, and Google sign-in.  

---

## 2. Scenario Analysis  

- **Users:**  
  - *Primary:* Christoffel (restaurant owner) and the Head Chef (admin users).  
  - *Secondary:* Kitchen managers and sous-chefs who reference the menu during service.  

- **Purpose:**  
  Replace the error-prone paper menu with a mobile tool that allows staff to add, view, update, and manage dishes instantly.  

- **Data Stored:**  
  Each `MenuItem` includes: ID, name, description, course type, price, ingredients, dietary info, prep time, availability, and timestamps.  

- **Core Functions:**  
  1. Add menu items  
  2. View items in a grid  
  3. Edit/update items  
  4. Filter by course and search by name  

- **Usability Requirements:**  
  - *Consistency & simplicity:* unified theme, typography, and navigation; large touch targets; add a dish in under three steps with clear feedback.  
  - *Error prevention & efficiency:* input validation, delete confirmations, high contrast, offline viewing, and smooth scrolling.  

---

## 4. Changelog  

### Added Features (new, not in original design)  
- Drinks menu with illustrations (Kir Royale, Bordeaux Rouge, Citron Pressé, Café au Lait).  
- Multi-dish cart with quantity controls.  
- “Your Order” page with totals and item management.  
- Multi-item order confirmation screen.  
- Settings page with account and menu preferences.  
- Name field at login for personalized greetings.  
- Persistent storage via `localStorage`.  
- Accessibility improvements (labels, ARIA roles, keyboard navigation).  

### Changed Features (different from original design)  
- Platform: built as a browser app instead of React Native.  
- Greeting: “Welcome back, <name>” instead of “Good evening, Christoffel.”  
- Google sign-in: “Continue with Google” instead of “Sign up by Google.”  
- Filters: added Drinks and a bottom sheet filter.  
- Dish card button shows quantity and disables unavailable dishes.  
- Dish Detail: merged “Order Now” into cart flow; added course and prep time.  
- Delete moved to Manage Menu list with confirmation dialog.  
- Add moved to a bottom tab instead of Manage Menu button.  
- Manage Menu redesigned as a compact text list.  
- Confirmation dialogs built in-app instead of native alerts.  

### Not Yet Built (still pending)  
- Create Account screen with full name and confirm password.  
- Password show/hide toggle.  
- “Deliver to” selector and “See all” link.  
- Order tracking with live status.  
- Star ratings and ingredient chips.  
- Dietary info and timestamps.  
- Profile avatar in Manage Menu.  
- Dish photos for new items.  

---

## 5. Features  

- **Sign-in:** Name, email, password, or Google sign-in.  
- **Menu:** Two-column grid with filters, search, and detailed dish pages.  
- **Ordering:** Cart with quantity controls, totals, and confirmation screen.  
- **Menu Management:** Add/Edit forms with validation, Manage Menu list with edit/delete.  
- **Settings:** Change name, hide unavailable dishes, reset menu, sign out, clear data.  

---

## 7. Sample Menu  

| Dish | Course | Price |
|---|---|---|
| Quiche Lorraine | Starter | R145 |
| Croissant | Starter | R85 |
| Coq au Vin | Main | R295 |
| Cassoulet Savoureux | Main | R310 |
| Ratatouille | Main | R185 |
| Crème Brûlée | Dessert | R120 |
| Kir Royale | Drink | R110 |
| Bordeaux Rouge | Drink | R98 |
| Citron Pressé | Drink | R55 |
| Café au Lait | Drink | R48 |

---

## 20. Known Limitations  

- Orders are not sent to a backend system.  
- No real account system (login accepts any credentials).  
- Cart is session-based only.  
- Data is stored locally, not shared across devices.  
- Google sign-in is simulated in the preview.  
- Several design features remain unimplemented.  

---

## 21. Roadmap  

- Add full React/TypeScript source (`src/`).  
- Build Create Account and real authentication.  
- Align menu content with design wireframes.  
- Backend integration for orders and tracking.  
- Add ratings, dietary info, timestamps.  
- Implement “Deliver to” selector and order notes.  
- Enable shared menu storage across devices.  
- Real Google sign-in with server verification.  
- Add drink photos and port to React Native.  
- Automated testing.  

---

## References  

- Boduch, A. and Derks, R. (2023) *React and React Native: Build cross‑platform JavaScript applications with native power for mobile, web and desktop.* 4th edn. Birmingham: Packt Publishing.  

- Eisenberg, A. (2022) *Learning React Native: Building Native Mobile Apps with JavaScript.* 2nd edn. Sebastopol: O’Reilly Media.  

- Facebook Inc. (2024) *React Native: Learn once, write anywhere.* Available at: `https://reactnative.dev/docs/getting-started` [(reactnative.dev in Bing)](https://www.bing.com/search?q="https%3A%2F%2Freactnative.dev%2Fdocs%2Fgetting-started") (Accessed: 12 October 2026).  

- Figma Inc. (2024) *Figma: Collaborative interface design tool.* Available at: [https://www.figma.com/](https://www.figma.com/) (Accessed: 12 October 2026).  

- diagrams.net (2024) *draw.io: Diagramming and whiteboarding software.* Available at: [https://www.diagrams.net/](https://www.diagrams.net/) (Accessed: 12 October 2026).  

- Google (2024) *Material Design 3.* Available at: [https://m3.material.io/](https://m3.material.io/) (Accessed: 12 October 2026).  

- Apple Inc. (2024) *Human Interface Guidelines.* Available at: `https://developer.apple.com/design/human-interface-guidelines/` [(developer.apple.com in Bing)](https://www.bing.com/search?q="https%3A%2F%2Fdeveloper.apple.com%2Fdesign%2Fhuman-interface-guidelines%2F") (Accessed: 12 October 2026).  

- Walker, J.R. (2021) *The Restaurant: From Concept to Operation.* 8th edn. Hoboken: John Wiley & Sons.  

- Biørn‑Hansen, A., Grønli, T. and Ghinea, G. (2020) ‘A survey and taxonomy of core concepts and research challenges in cross‑platform mobile development’, *ACM Computing Surveys*, 53(5), pp. 1–39.  

---
