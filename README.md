# IRONZONE GYM

A responsive gym landing website built with **HTML, CSS and vanilla JavaScript** only.
No React, no Node.js, no npm, no database, no paid tools.

This project is a **student demo**. All prices, statistics, address details and the
enquiry form are examples — they are not connected to any real gym system.

---

## 1. How to run the website

### Option A — Live Server in VS Code (recommended)

1. Open the folder `IronZone-Gym` in VS Code.
2. Install the free extension **Live Server** by Ritwick Dey
   (Extensions panel → search "Live Server" → Install).
3. Right-click `index.html` in the Explorer panel.
4. Choose **"Open with Live Server"**.
5. The browser opens at something like `http://127.0.0.1:5500/index.html`.

To stop it, click **"Port: 5500"** in the VS Code status bar, or close Live Server.

### Option B — just open the file

Double-click `index.html`. The site also works directly from the file system
(`file:///...`), because no JavaScript feature needs a server.

> Tip: Live Server is better for development because it auto-refreshes when you save.

---

## 2. Folder structure

```
IronZone-Gym/
├── index.html              Main page (all sections)
├── css/
│   └── style.css           All styling and responsive rules
├── js/
│   └── script.js           Menu, plan buttons, form validation, footer year
├── images/
│   ├── favicon.svg         Browser tab icon
│   ├── gym-equipment.svg   Fallback if the About photo cannot load
│   ├── strength.svg        Fallback for the Weight Training card
│   ├── cardio.svg          Fallback for the Cardio & Fitness card
│   └── personal.svg        Fallback for the Personal Training card
└── README.md               This file
```

---

## 3. Sections

| Section           | ID          | Notes                                                    |
| ----------------- | ----------- | -------------------------------------------------------- |
| Navigation bar    | —           | Logo, 5 links + Join Now button, mobile hamburger menu   |
| Hero              | `#home`     | Headline, intro, 2 buttons, background photo, demo stats |
| About             | `#about`    | Intro, equipment/trainer/environment highlights          |
| Programs          | `#programs` | Weight training, cardio, personal training               |
| Motivation banner | —           | Quote + call to action                                   |
| Membership        | `#pricing`  | Monthly, quarterly, yearly — with demo prices            |
| Contact           | `#contact`  | Enquiry form with validation                             |
| Footer            | —           | Logo, navigation, automatic copyright year               |

---

## 4. What the JavaScript does

1. **Footer year** — reads `new Date().getFullYear()` so it updates automatically.
2. **Mobile menu** — opens/closes with the ☰ button, closes on a link click,
   Escape key, outside click, or when the window widens to desktop size.
   Updates `aria-expanded` so screen readers know the state.
3. **Membership buttons** — `data-plan="Monthly"` on a button sets the form's
   plan dropdown to that value, then the link scrolls to the form.
4. **Form validation** — the form uses `novalidate`, so _our own_ clear messages
   appear instead of the browser's small bubble:
   - Name is required and must be at least 2 characters.
   - Email is required and must look like `you@example.com`.
   - Plan is required.
   - Errors appear under the field, the field gets a red border and
     `aria-invalid="true"`, and the main message turns red.
   - On success a green/gold confirmation appears, the form resets, and the
     page does **not** reload (we call `event.preventDefault()`).
   - **Nothing is sent or stored.** There is no backend.
5. **Image fallbacks** — if an Unsplash photo fails (offline, blocked network),
   `data-fallback="images/xxx.svg"` swaps in a local illustration.

---

## 5. Design system

| Item         | Value                           |
| ------------ | ------------------------------- |
| Background   | `#101110` (near-black)          |
| Card surface | `#191b19`                       |
| Accent       | `#f5c451` (gold)                |
| Body text    | `#f7f7f4`                       |
| Muted text   | `#a4a69f`                       |
| Borders      | `#30322e`                       |
| Headings     | Barlow Condensed (Google Fonts) |
| Body         | Inter (Google Fonts)            |

Fonts need an internet connection. If they fail to load the page falls back to
system fonts and still works.

---

## 6. Responsive breakpoints

| Width           | Layout                                                            |
| --------------- | ----------------------------------------------------------------- |
| Above 900px     | Full desktop: 3-column card grids, side-by-side About and Contact |
| 681px – 900px   | Tighter spacing, smaller nav text                                 |
| 680px and below | Hamburger menu, single-column grids, stacked footer               |

---

## 7. Checking it on desktop and mobile

**Desktop:** resize the browser window. Cards should drop from 3 columns to
1 column, and the nav links should become a ☰ button around 680px.

**Mobile in Chrome / Edge:**

1. Open the site.
2. Press `F12` (Developer Tools) → click the **device toolbar** icon
   (`Ctrl + Shift + M`).
3. Pick "iPhone 12 Pro" or "Pixel 5" from the device list.
4. Tap ☰ — the menu should slide open and the icon change to ✕.
5. Tap "About" — the menu should close and the page should scroll to About.

**Mobile on your actual phone:** both devices must be on the same Wi-Fi.
In Live Server's settings, set the host to `0.0.0.0` and open
`http://<your-computer-IP>:5500` on the phone. Find your IP with `ipconfig`.

---

## 8. Things that are intentionally fake (demo only)

- Membership prices (₹1,499 / ₹3,999 / ₹11,999) — **confirm real prices with the gym.**
- Hero statistics (500+ members, 15+ trainers, 7 days) — example numbers.
- Address and opening hours — placeholders.
- The enquiry form — validates input and shows a confirmation, but **does not
  send or save anything**. Do not type real personal information into it.

To make the form actually send enquiries, you would need a real backend
(for example PHP, or a free service like Formspree). That is outside this project.

---

## 9. Browser support

Tested in Chrome and Edge. Works in Firefox and Safari too.
Uses only widely supported CSS (Grid, Flexbox, `clamp()`) and ES6 JavaScript.
No build step, no transpiling.

---

## 10. Credits

- Photos: [Unsplash](https://unsplash.com) (free to use).
- Icons: hand-written inline SVG, no icon library.
- Fonts: [Google Fonts](https://fonts.google.com).
