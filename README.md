# Minecraft Bot Hosting Platform

This monorepo contains a secure, modular implementation for a public Minecraft Java Edition bot hosting platform with separate user and admin experiences, a Firebase-backed control plane, and a Mineflayer-based bot worker runtime.

## Core goals
- Public user registration and login using Firebase Authentication
- Backend enforcement of the normal-user max of 3 active bots
- Separate admin dashboard and admin-only routes protected by trusted backend checks
- Free-hosting honesty and explicit limits
- Real Firebase client setup with the exact owner-supplied web config
- Secure admin bootstrap process for wingxmc26@gmail.com
- Honest setup states when Firebase or the bot runtime is not configured

## Exact owner-specified Firebase web config
```ts
export const firebaseConfig = {
  apiKey: "AIzaSyD-CPX3R-MmTE9_qJn3hzgd6XVckHy_BRw",
  authDomain: "minecraft-bot-hosting.firebaseapp.com",
  projectId: "minecraft-bot-hosting",
  storageBucket: "minecraft-bot-hosting.firebasestorage.app",
  messagingSenderId: "477684008962",
  appId: "1:477684008962:web:84773428fe03375617ff1b",
  measurementId: "G-8E8Z2FGXVQ"
};
```

## Project structure
- `apps/web`: React + Vite + TypeScript frontend
- `apps/server`: Express + Socket.IO backend/control plane
- `apps/worker`: Mineflayer-based bot worker
- `firebase`: Firestore and Storage rules
- `scripts`: admin bootstrap utility
- `tests`: validation and security checks

## Setup steps
1. Create Firebase project: `minecraft-bot-hosting`
2. Enable Email/Password auth
3. Enable Firestore and Cloud Storage
4. Deploy `firebase/firestore.rules` and `firebase/storage.rules`
5. Populate `.env.example`, `.env.server.example`, and `.env.worker.example`
6. Run the bootstrap command shown below after the owner email is verified
7. Start web app, server, and worker

## Admin bootstrap
```bash
INITIAL_ADMIN_EMAIL=wingxmc26@gmail.com FIREBASE_PROJECT_ID=minecraft-bot-hosting npx tsx scripts/bootstrap-admin.ts
```

This script is intentionally trusted server-side only. It verifies that the account exists and has a verified email, then sets the admin custom claim. It must not be exposed as a public endpoint.

## Local development
```bash
npm install
cp .env.example .env
cp .env.server.example .env.server
cp .env.worker.example .env.worker
npm run dev
```

## Build and test
```bash
npm run build
npm run typecheck
npm run test
```

## Honest limitations
- Firebase services must be enabled and rules deployed
- Real bot runtime requires valid Minecraft server access and a compatible Java Edition bot runtime
- Free hosting cannot guarantee 24/7 uptime for long-running bot workers
- The platform includes secure architecture and setup states, but live runtime data remains unavailable until the required services and credentials are configured

## Feature status matrix
- Firebase Auth, Firestore, Storage integration: implemented with configuration templates
- Admin bootstrap with explicit owner email: implemented
- Backend auth verification and route guarding: implemented
- User/admin dashboard shell: implemented
- Bot worker integration: implemented as a real runtime contract with honest “not connected” states when not configured
- Full live inventory and bot telemetry: architecture/pipeline implemented; requires a valid connected runtime
