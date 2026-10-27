# Context Auth (TypeScript + Context API)

React Native CLI app for the User Authentication assignment. State is managed with React Context API.

## Milestones

| Milestone | Scope | Status |
|-----------|--------|--------|
| **A** | Login & Signup (email + password), AuthContext, floating bottom tabs | Done |
| **B** | Home (name + email), logout, Home tab + guest → Login | Done |
| **C** | Email/password validation rules, popup modals | Done |
| **D** | AsyncStorage session persistence | Planned |

### Milestone A — Auth screens & context

- **Login** and **Signup** with email and password
- **AuthContext**: `login`, `signup`, `logout`, `user`
- In-memory user store (clears when the app process restarts)
- **Floating bottom tab bar**: Login | Signup (active tab highlighted)

### Milestone B — Home & guest access

- **Signup** collects **name**, email, and password; does **not** log the user in
- After signup: **toast** (“Account created. Please sign in.”) and switch to **Login**
- **Home** tab on the same floating bar: **Login | Signup | Home**
- **Guest** (not signed in) tapping **Home** → **Login** tab
- After **login** → **Home** with name and email; **Logout** returns to **Login**
- While signed in, **Login** / **Signup** stay visible but **do not navigate** (locked); **Home** stays active
- **Home** mock marketing UI: promo banner, typography hero, looping empty carousel, account card + logout

### Milestone C — Validation & modals

- **Login**: invalid email format, password rules (required, min 6 chars), wrong credentials → **modal**
- **Signup**: missing name/email/password, invalid email, password &lt; 6, duplicate email → **modal**
- Invalid fields get a **red border**; message is shown in the popup (not inline banners)
- **Password visibility toggle** (Feather eye / eye-off icons) on Login and Signup
- Validators live in `src/utils/validation.ts`; modals via `ModalContext`

### Milestone D — Persist session (planned)

- **AsyncStorage** so the user stays signed in after app restart
- Restore `user` on launch; clear storage on logout

## Prerequisites

- Node.js **22.13+**, **24.3+**, or **26+** (not Node 23) — `nvm use` in this folder
- Xcode (iOS) and/or Android Studio (Android)
- CocoaPods for iOS: `cd ios && bundle exec pod install` (or `pod install`)

## Run

From the **repo root**, install dependencies once:

```bash
./prepmodules
```

Or only this app:

```bash
yarn install
cd ios && pod install && cd ..
```

**Terminal 1 — Metro (fresh cache after native/deps changes):**

```bash
yarn start --reset-cache
```

**Terminal 2 — run on device/simulator:**

```bash
yarn ios --simulator "LifeRPG iPhone 17 Pro"
# or
yarn android
```

npm works too: `npm install`, `npm start -- --reset-cache`, `npm run ios`.

## Commits

Follow the repo convention: **`Feature:`**, **`Fix:`**, or **`Misc:`** + summary (see root [README](../README.md#commit-messages)).
