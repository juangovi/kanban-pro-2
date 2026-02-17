import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

export const loginWithEmail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
}
export const signUpWithGithub = async () => {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
};

export const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
};

export const signUpWithEmailAndPassword = async (credentials) => {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    const user = userCredential.user;
    await updateProfile(user, {
        displayName: credentials.name
    });
    await sendEmailVerification(user)
};

export const passwordReset = async (credentials) => {
    await sendPasswordResetEmail(auth, credentials.email);
};