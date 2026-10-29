import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User
} from "firebase/auth";
import { auth } from "./firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminSetupRequired: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  refreshAdminState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSetupRequired, setAdminSetupRequired] = useState(false);

  const refreshAdminStateForUser = async (firebaseUser: User) => {
    const tokenResult = await firebaseUser.getIdTokenResult(true);
    const adminClaim = Boolean(tokenResult.claims.admin);
    const isDesignatedOwner =
      firebaseUser.email?.toLowerCase() === "wingxmc26@gmail.com" &&
      firebaseUser.emailVerified;

    setIsAdmin(adminClaim);
    setAdminSetupRequired(isDesignatedOwner && !adminClaim);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        await refreshAdminStateForUser(nextUser);
      } else {
        setIsAdmin(false);
        setAdminSetupRequired(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await refreshAdminStateForUser(userCredential.user);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    if (!user) return;
    await sendEmailVerification(user);
  };

  const refreshAdminState = async () => {
    if (!user) return;
    await refreshAdminStateForUser(user);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAdmin,
      adminSetupRequired,
      signUp,
      signIn,
      signOutUser,
      resetPassword,
      sendVerificationEmail,
      refreshAdminState
    }),
    [user, loading, isAdmin, adminSetupRequired]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext is missing");
  }
  return context;
}
