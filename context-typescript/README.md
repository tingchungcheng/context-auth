# Context Auth (TypeScript + Context API)

React Native CLI app for the User Authentication assignment. Global auth state uses **React Context API** (not Redux).

**Full walkthrough (navigation, session vs accounts, debugging):**  
[`docs/architecture-auth-navigation-context.txt`](docs/architecture-auth-navigation-context.txt)

## Milestones (all done)

| Milestone | Scope |
|-----------|--------|
| **A** | Login & Signup, AuthContext, floating tabs |
| **B** | Home, logout, tab rules for guest / signed-in |
| **C** | Validation, error modals, password visibility icons |
| **D** | AsyncStorage session + saved demo accounts |

## Quick mental model

| What | Where | Logout | Kill app |
|------|--------|--------|----------|
| **Session** (logged-in user) | Context `user` + `@context-auth/session` | Cleared | Restored if you were logged in |
| **Accounts** (signup data) | `authStore` + `@context-auth/users` | Kept | Kept — you can log in again |
| **Form inputs** | Each screen’s `useState` | Not auto-cleared | Lost with process |

Password is **never** stored in Context or session — only in the demo account registry.

## Behaviour highlights

- **Signup** → toast → **Login** tab (not auto signed-in).
- **Login** → toast → **Home**; session written to AsyncStorage.
- **Guest** taps **Home** → toast → **Login**.
- **Signed-in** taps **Login** / **Signup** → toast, stay on **Home** (tabs visible but locked).
- **Cold start** with saved session → loading spinner → **Home** (`AppNavigation` + `navigationRef`, not early `useNavigation`).

## Prerequisites

- Node **22.13+**, **24.3+**, or **26+** (not Node 23) — `nvm use`
- Xcode / Android Studio, CocoaPods for iOS

## Run

From repo root: `./prepmodules`

```bash
cd context-typescript
yarn start --reset-cache          # terminal 1
yarn ios --simulator "LifeRPG iPhone 17 Pro"   # terminal 2
```

After changing **native** deps (e.g. AsyncStorage, vector icons):

```bash
cd ios && pod install && cd ..
yarn ios
```

Metro reload (**⌘R**) is not enough for new native modules.

## Debugging (no Redux DevTools)

```bash
npx react-devtools
```

Select **`AuthProvider`** → **hooks** → find `user` (`null` or `{ name, email }`).  
See **`docs/architecture-auth-navigation-context.txt` §11** for Context vs Redux logging.

**AsyncStorage (dev builds only):** watch the Metro terminal for lines prefixed with  
`[context-auth/storage]` on app launch, login, logout, and signup (passwords are not logged).

## Commits

Repo convention: **`Feature:`** / **`Fix:`** / **`Misc:`** — see root [README](../README.md#commit-messages).
