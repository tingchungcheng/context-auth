# context-auth

User Authentication assignment implementations for React Native (CLI).

## Projects

| Folder | Stack | Status |
|--------|--------|--------|
| [`context-typescript/`](context-typescript/) | TypeScript + Context API + React Navigation | Milestone D |
| [`redux-javascript/`](redux-javascript/) | JavaScript + Redux (planned) | Not started |

Assignment spec: [`requirements.txt`](requirements.txt)

**How this app works (Context + navigation + AsyncStorage):**  
[`context-typescript/docs/architecture-auth-navigation-context.txt`](context-typescript/docs/architecture-auth-navigation-context.txt)

## Node version

React Native **0.88** does not support **Node 23**. Use **22.13+**, **24.3+**, or **26+**:

```bash
nvm install   # reads .nvmrc (22.13.0)
nvm use
node -v
```

## Install dependencies

`node_modules` is not in git. After clone, from the repo root:

```bash
./prepmodules
```

This runs **`yarn install`** (or `npm install` if Yarn is not installed) for each app with a `package.json`, and `pod install` under `ios/` on macOS when CocoaPods is available.

**Run the demo (Yarn):**

```bash
cd context-typescript
yarn start --reset-cache   # terminal 1
yarn ios                   # terminal 2 (or yarn android)
```

## Repository

Remote: `git@github.com:tingchungcheng/context-auth.git`

## Milestone plan (TypeScript variant)

All milestones **A–D** are implemented in `context-typescript/`.  
See [`context-typescript/README.md`](context-typescript/README.md) for behaviour and run steps.

## Commit messages

Use a single prefix and a short summary:

| Prefix | When to use |
|--------|-------------|
| **Feature:** | New behavior, screens, milestones |
| **Fix:** | Bug fixes and regressions |
| **Misc:** | Docs, tooling, refactors, chores |

Examples:

```text
Feature: milestone B home tab and guest redirect
Fix: yarn install failing on Node 23
Misc: add prepmodules and nvmrc
```
