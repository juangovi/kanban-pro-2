import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

export const loginWithEmail = async (email, password, setLoading, addMessage, t, setErrores) => {
    try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        switch (error.code) {
            case 'auth/invalid-credential':
            case 'auth/too-many-requests':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                addMessage(t("errorLogin"), "error");
                setErrores({ email: true, password: true });
                break;
            default:
                addMessage(t("unexpectedError"), "error");
        }
    } finally {
        setLoading(false);
    }
}
export const signUpWithGithub = async (setLoading, addMessage, t) => {
    const provider = new GithubAuthProvider();
    try {
        setLoading(true);
        const result = await signInWithPopup(auth, provider);
        //const credential = GithubAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        return user;
    } catch (error) {
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                addMessage(t("popupClosed"), "error");
                break;
            default:
                addMessage(t("unexpectedError"), "error");
        }
    } finally {
        setLoading(false);
    }
};

export const signUpWithGoogle = async (setLoading, addMessage, t) => {
    const provider = new GoogleAuthProvider();
    try {
        setLoading(true);
        const result = await signInWithPopup(auth, provider);
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        return user;
    } catch (error) {
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                addMessage(t("popupClosed"), "error");
                break;
            default:
                addMessage(t("unexpectedError"), "error");
        }
    } finally {
        setLoading(false);
    }

};

export const signUpWithEmailAndPassword = async (setLoading, addMessage, t, credentials, onClose, setErroresSignUp) => {
    try {
        console.log("hola");
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: credentials.nombre
        });
        await sendEmailVerification(user);
        addMessage(t("emailVerificationSent"), "info", "long");
        onClose();
    } catch (error) {
        switch (error.code) {
            case "auth/email-already-in-use":
                addMessage(t("emailAlreadyInUse"), "error");
                setErroresSignUp(erroresSignUp => ({ ...erroresSignUp, email: true }));
                break;
            default:
                addMessage(t("unexpectedError"), "error");
                console.log(error);
                break;
        }
    } finally {
        setLoading(false);
    }
};

export const passwordReset = async (setLoading, addMessage, t, credentials, onClose, setErroresPasswordReset) => {
    try {
        setLoading(true);
        await sendPasswordResetEmail(auth, credentials.email);
        addMessage(t("passwordResetSent"), "info", "long");
        onClose();
    } catch (error) {
        switch (error.code) {
            case "auth/user-not-found":
                addMessage(t("userNotFound"), "error");
                setErroresPasswordReset(erroresPasswordReset => ({ ...erroresPasswordReset, email: true }));
                break;
            default:
                addMessage(t("unexpectedError"), "error");
                console.log(error);
                break;
        }
    } finally {
        setLoading(false);
    }
};