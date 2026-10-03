import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

// Optional: force account selection every time
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async () => {
  if (!auth) {
    console.warn("Firebase Auth is not initialized. Cannot sign in.");
    return null;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: unknown) {
    console.error("Error signing in with popup:", error);
    
    // Fallback to redirect if popup is blocked by the browser
    const errorCode = (error as { code?: string }).code;
    if (errorCode === 'auth/popup-blocked') {
      console.log("Popup blocked. Falling back to redirect sign-in...");
      await signInWithRedirect(auth, googleProvider);
      return null; // Will redirect
    }
    
    throw error;
  }
};

export const signOutUser = async () => {
  if (!auth) {
    console.warn("Firebase Auth is not initialized. Cannot sign out.");
    return;
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
