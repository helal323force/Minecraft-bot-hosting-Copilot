import "dotenv/config";
import admin from "firebase-admin";

if (!process.env.INITIAL_ADMIN_EMAIL) {
  throw new Error("INITIAL_ADMIN_EMAIL is required.");
}

admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID ?? "minecraft-bot-hosting"
});

async function main() {
  const email = (process.env.INITIAL_ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (!email) {
    throw new Error("INITIAL_ADMIN_EMAIL is empty.");
  }

  const user = await admin.auth().getUserByEmail(email);
  if (!user.emailVerified) {
    throw new Error(`User ${email} exists but email is not verified in Firebase Auth.`);
  }

  const claims = user.customClaims ?? {};
  await admin.auth().setCustomUserClaims(user.uid, {
    ...claims,
    admin: true
  });

  console.log(`Admin claim set for ${user.uid} (${email}). Sign out and sign back in to refresh the token.`);
}

main().catch((error) => {
  console.error("Bootstrap failed:", error);
  process.exit(1);
});
