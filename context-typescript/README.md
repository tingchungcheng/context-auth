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

- Node.js 22+ (see `package.json` engines)
- Xcode (iOS) and/or Android Studio (Android)
- CocoaPods for iOS: `cd ios && bundle exec pod install` (or `pod install`)

## Run

```bash
npm install
npm start
```

In another terminal:

```bash
npm run ios
# or
npm run android
```

## Milestone A behavior

- **Login** and **Signup** screens with email and password fields
- **AuthContext** exposes `login`, `signup`, `logout`, and `user`
- In-memory user store (resets when the app process restarts)
- React Navigation native stack: Login ↔ Signup
- Successful auth shows an inline success banner; Home navigation comes in milestone B
