NALA: Luxury Fine-Dining Menu & Ordering App

A black and gold menu management & ordering application for a luxury French fine dining restaurant called NALA. It supersedes the paper menu with a quick, mobile-first application for staff to use to navigate the menu, organize food and beverages and order multiple items on a single cart.

	
Name	Hlompho Muzi Xolo.

Student Number	ST10476575.

Unit	MAST5112 (Portfolio of Evidence).

Repository	https://github.com/44Xolo/NALA-ASSIGNMENT-1.

Youtube Link 
https://youtube.com/shorts/nESHh-IQ8Hs?feature=share


1. Project Overview
NALA is a fine-dining, classic French restaurant which offers luxury cuisine. The menu was still in paper form which was slow to change, difficult to organise by course and easily lost. This project aims to replace it with a digital application that the owner, head chef and kitchen staff can access, using their mobile phone or tablet.

The full written analysis is included as an accompanying Word file in this repository (HLOMPHO MUZI XOLO POE PART MAST5112 (2) (2).docx): scenario analysis, wireframes, application flow diagram, Reflecting on planning and designing React Native components.

2. The Scenario
Question	Answer
Who uses it?	Secondary: The Leader of the Kids & Staff.The Head Chef, who is also a restaurant owner, is the primary role.Christoffel (restaurant owner), secondary is the Head Chef. Primary: kitchen managers, sous-chefs who review the menu prior to service. The staff are all non-technical internal staff.
What is its purpose?	To eliminate the "paper menu" that can cause errors, enable staff to add, view, update, manage and order food from a mobile device, updated in real time and with no loss of data, by course.
What must it store?	A record is made for each menu item for every dish or drink (see Data Model)
What must it do?	Sign in staff, display menu, search/filter menu, add/remove items and place multiple orders for dishes.

3. Features

Sign-in

Logon using your name, email and password.
Proceed with Google option (mocked up in the browser preview; true configuration is in Google Sign-In Setup).
You will be remembered and appear on Home as "Welcome back, <name>".

Menu

Two column format grid of dishes and drinks with photo, course badge and price.
The Filter chips include All, Starters, Mains, Desserts, Drinks and a Filter tab with a bottom sheet.
Vivoe search by dish name.
Detail page of a dish with description, ingredients, preparation time and availability.
Dishes that are not available are dimmed and not orderable.

Ordering (cart)

A shopping cart with a number in a badge to indicate the number of products in the cart.
Tap the gold ＋ on any dish card to add it, as many times as you like. The button indicates how many of the dish ordered by the customer are in the order.
Your Order page: Edit quantities of each item using the − and ＋ buttons, delete a dish, view the cost of each item and the order total, clear the entire order (requires confirmation).
Place order displays an Order Confirmed screen, including order number, all dishes, quantity and price, and total.

Menu management

Add and Edit forms with validation (must include a name, and price should be more than 0).
Manage Menu list with Edit and Delete. When erasing, the computer asks if you are sure.
This displays the course dropdown, price (R), description, ingredients and the 'available today' switch as well as the prep time of the course.

Settings

Change your name.
If any dishes are not available to hide on Home.
Shortcut to Manage Menu, Reset sample menu, Sign out and Clear all data (both with confirmation).

Other

Can be used without an internet connection. Menu, name and settings are stored in the localStorage (browser).
Constantly, all screens have a black and gold luxury theme.

4. Screens
#	Screen	Purpose
2	Select an account to log into or create a new one.3	Select a profile to log in with or create a new profile.
The 2 is a standalone app.The 2 stands alone as an app.
Dish Detail (3) Full dish information, Edit and Add to order
4	Your Order	Review quantities, totals, place or clear the order
6	Order Line Item	Order Line Item number, items and quantity
6	Add / Edit Menu Item	Validated form (no photo per the updated brief)
Manage Menu: Edit and delete items, reset sample menu.
The settings icon will display in the toolbar when you select it.When you choose Settings, the icon will appear in the toolbar.
9. Filter sheet - Filter by course from the bottom tab.

    
5. Sample Menu

The images for the 6 food items are from this repository. The four drinks are illustrated with gold-line images that were created for the app. The prices and descriptions are illustrative and should be substituted with the actual menu.

Dish	Course	Price
Quiche with Herbed Cheese, served with vegetables and crust, R145.00—Starter.
Croissant	Starter	R85.00
Coq au Vin	Main	R295.00
Cassoulet Savoureux 2 main dishes R310.00
Ratatouille	Main	R185.00
Crème Brûlée	Dessert	R120.00
Kir Royale	Drink	R110.00
Bordeaux Rouge	Wine R98.00
Drink Citron Pressé	R55.00
Coffee with Milk	Drink	R48.00

6.The guide to using the app.
Sign in: type in your name, email and password (any of these will do in the preview) or click Continue with Google.
Browse: use the filter chips or the search box on Home.
Create an order: click the gold ＋ for each dish you would like. Tap it once again to get more of the same dish.
Review: press the cart icon (top right). Adjust amount, remove plate, check total.
Place the order: tap Place order to see the confirmation.
Add a dish to the menu using the Add tab or edit or delete a dish from the menu using Manage on Home.
Tap the Settings tab to edit your name, to hide unavailable dishes, sign out or reset data settings.

7. Tech Stack
Layer	Technology
Browser preview (nala-preview.html)	Single-file HTML, CSS and vanilla JavaScript, no install needed
Persistent localStorage (menu, name, settings)
Fonts	Playfair Display (headings), Inter (body)
React 18.3, TypeScript 5.6 (strict), Vite 5.4, Tailwind CSS 3.4, PostCSS, lucide-react
Google sign-in component – Google Identity Services (GoogleSignIn.tsx)
The planning for mobile target is React Native, AsyncStorage / SQLite.
Design tools	draw.io (diagrams.net), Figma

9. Design System
Token	Value	Use
Background	
#0A0A0A	App background
Surface	
Cards and panels are #1E1E1E.
Text	
Back to topBack to bottom.Back to topBack to bottom.
Accent	
Gold - #C9A86A (gold) Buttons, badges, cart badge, highlights
Error	
Errors that result from validation and delete actions.Errors that come from validation and delete action.
Text font	Playfair Display	NALA wordmark and text
Use blank space.Use blank space in	Inter	Body copy and form fields
Submit	12px radius, 42px height	All primary actions.Leave	42px height, 12px radius	All primary actions.
The minimum size of touch targets must be at least 44 × 44	All tappable elements

The bottom tab bar is used for navigation (Home, Add, Filter, Settings) and the cart icon is always in the top right corner.

10. Data Model
ts
interface MenuItem {
  id: string;
  name: string;
  course: 'Starter' | 'Main' | 'Dessert' | 'Drink';
  price: number;        // in Rands, must be > 0
  desc: string;
  ing: string;          // ingredients separated by commas
  prep: number;         // minutes
  ok: boolean;          // available today
  The image key or null for a letter placeholder.
}

What is the dish id that is being added to the cart?
The data type for the record is Record<string, number>.

interface Order {
  ref: string;          // e.g. "#16578"
  total: number;
  An array of strings, numbers, and numbers called lines, i.e. rows.
}

11. Repository Structure
NALA-ASSIGNMENT-1/
├── nala-preview.html             # Complete working app (open in any browser)
├── GoogleSignIn.tsx (52 lines of code) - Real Google sign-in component for the React build.├── GoogleSignIn.tsx (52 lines of code) Real Google sign-in component for the React build.
├── README.md
├── index.html                    # Vite entry (expects /src/main.tsx)
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── .env.example                  # Template for environment variables
├── nala-luxury-fine-dining-restaurant-interior-black.jpg
├── Cassoulet Savoureux.jpg
├── Coq au Vin.jpg
├── Cre`me Brule`e.jpg
├── Crossiant.jpg
├── QUICHE LORRAINE.jpg
├── ratoue.jpg
└── HLOMPHO MUZI XOLO POE PART MAST5112 (2) (2).docx   # POE Part 2, Written

The nala-preview.html and GoogleSignIn.tsx files must be included in the repository with the other files.

12. Getting Started
Open the app without needing to download or install anything.
Download or clone the repository.
Double-click nala-preview.html. It automatically comes up in your browser and is used offline (the photos and the drink pictures are integrated).
The build is based on Option B: React, Vite and TypeScript build.

No experience with Docker is required.

bash
git clone https://github.com/44Xolo/NALA-ASSIGNMENT-1.git
cd NALA-ASSIGNMENT-1
npm install
Then edit the .env file, add your own values to it and save it.
npm run dev              # http://localhost:5173

Production build:

bash
npm run build
npm run preview          # http://localhost:4173

Vite build assumes that the application is contained in src/ (the root of src is src/main.tsx). That folder doesn't exist in the repository, and thus Option B will only work when the folder has been added. Today working if option A is used.

13. Google Sign-In Setup

In the nala-preview.html the Continue with Google button will open a clearly labelled preview box that mimics the Google step; this is because a stand-alone page will not use real Google sign-in without your own credentials and web address registered with Google.

To use GoogleSignIn.tsx for real sign-in:

In Google Cloud Console go to APIs & Services → Credentials → Create credentials → OAuth client ID → Web application.
Add http://localhost:5173 (and deployed address) to Authorised JavaScript origin.
Copy the Client ID and paste it into .env under VITE_GOOGLE_CLIENT_ID.
Use the component on your login screen:
tsx
<GoogleSignIn onSignIn={(user) => console.log(user.name, user.email)} />

The only thing that it decodes is the Google token to show the name. To ensure it is a valid token, the production system must check its validity on a server.

14. Environment Variables
Variable	Purpose
VITE_GOOGLE_CLIENT_SECRET	Google OAuth client secret used by GoogleSignIn.tsx

Client code is only reached by variables that begin with VITE_. Don't leak real secrets: .env is included in .gitignore, so only .env.example will be tracked.

15. Available Scripts
Command	Description
npm run dev	Run the Vite dev server on port 5173
Build with npm run build (Type-checking with tsc -b, then build to dist/ directory)
npm run preview - run the production build on port 4173

16. Usability and Accessibility
Consistency: a common theme, app typography, button style and navigation throughout all screens.
Error prevention: validated forms, price entry is numeric, fixed course drop down, confirmation for delete, reset, clear order, clear all data.
Efficiency: Add a dish in a couple of taps, build a multi dish order without scrolling away from the menu, preserve scroll position as you add dishes to the menu.
Readability: high contrast text for low lit dining rooms and well lit kitchens.
Accessibility: Labelled form fields, keyboard accessible dish card (Tab, Enter, Space), ARIA roles for dialogs, error messages and text description for images.
Security: all dish text is sanitized before displaying, thus special characters will not split the page.

18. Known Limitations
There is no place for orders. It is a confirmation screen only – no kitchen or back end, yet.
The order (cart) currently displayed is only maintained until the page is closed.
Menu data, name and settings live in the browser, so they are not shared between devices.
Browser preview is based on fake Google sign-in (see Google Sign-In Setup).
The prices listed, ingredients and descriptions are sample data only.
The src/ folder with the React/Vite code is not added to the repository yet.

20. Roadmap
 Add the application source of src/ (React, TypeScript, Tailwind) that matches with the preview
 Back end (to serve orders to the kitchen)
 Table number and order notes.
 Using shared menu storage (AsyncStorage / SQLite / database)
 This module provides a server side token verification for real Google signing-in.
 Photos of the beverages.Images of the beverages.
 Port to React Native (Expo) to phones & tablets
 Automated tests to validate, filter and total orders

21. References
Boduch, A. and Derks, R., 2023. React and React Native: Build cross-platform JavaScript applications with native power for mobile, web and desktop. 4th ed. Birmingham: Packt Publishing.
Eisenberg, A., 2022. Learning React Native: Building Native Mobile Apps with JavaScript. 2nd ed. Sebastopol: O'Reilly Media.
Facebook Inc., 2024. React Native: Learn once, write anywhere. Available at: https://reactnative.dev/docs/getting-started [Accessed 12 October 2026].
Figma, Inc., 2024. Figma: Collaborative interface design tool. Available at: https://www.figma.com/ [Accessed 12 October 2026].
diagrams.net, 2024. draw.io: Diagramming and whiteboarding software. Available at: https://www.diagrams.net/ [Accessed 12 October 2026].
Google, 2024. Material Design 3. Available at: https://m3.material.io/ [Accessed 12 October 2026].
Apple Inc., 2024. Human Interface Guidelines. Available at: https://developer.apple.com/design/human-interface-guidelines/ [Accessed 12 October 2026].
Walker, J.R., 2021. The Restaurant: From Concept to Operation. 8th ed. Hoboken: John Wiley & Sons.
Biørn-Hansen, A., Grønli, T. and Ghinea, G., 2020. A survey and taxonomy of core concepts and research challenges in cross-platform mobile development. ACM Computing Surveys, 53(5), pp.1-39.
