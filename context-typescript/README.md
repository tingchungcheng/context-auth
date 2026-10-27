# Context Auth (TypeScript + Context API)

React Native CLI app for the User Authentication assignment. State is managed with React Context API.

## Milestones

| Milestone | Scope | Status |
|-----------|--------|--------|
| **A** | Login & Signup screens (email + password), AuthContext, auth stack navigation | Done |
| **B** | Home screen (user info), logout, app stack vs auth stack | Planned |
| **C** | Password/email validation, popup modals | Planned |
| **D** | AsyncStorage session persistence | Planned |

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
yarn ios
# or
yarn android
```

npm works too: `npm install`, `npm start -- --reset-cache`, `npm run ios`.

## Milestone A behavior

- **Login** and **Signup** screens with email and password fields
- **AuthContext** exposes `login`, `signup`, `logout`, and `user`
- In-memory user store (resets when the app process restarts)
- React Navigation bottom tabs with a **floating** Login | Signup bar (active tab highlighted)
- Successful auth shows an inline success banner; Home navigation comes in milestone B
