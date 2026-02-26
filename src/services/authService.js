import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const init = () => {
    if (auth.currentUser) {
        auth.signOut();
    }
}

export const loginWithEmail = async (email, password) => {
    init();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
        sendEmailVerification(user)
        auth.signOut();
        return null
    }
    return user;
}
export const signUpWithGithub = async () => {
    init();
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);

    // 2. Intentamos obtener el documento
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        // ES UN USUARIO NUEVO - Creamos el perfil
        await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            displayNameLower: user.displayName.toLowerCase(),
            email: user.email,
            photoURL: user.photoURL,
            rol: "user",
            creacion: serverTimestamp()
        });
    }
    return user;
};

export const signUpWithGoogle = async () => {
    init();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);

    // 2. Intentamos obtener el documento
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        // ES UN USUARIO NUEVO - Creamos el perfil
        await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            displayNameLower: user.displayName.toLowerCase(),
            email: user.email,
            photoURL: user.photoURL,
            rol: "user",
            creacion: serverTimestamp()
        });
    }
    return user;
};

export const signUpWithEmailAndPassword = async (credentials) => {
    init();
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    const user = userCredential.user;


    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: credentials.name,
        displayNameLower: credentials.name.toLowerCase(),
        email: credentials.email,
        photoURL: "",
        rol: "user",
        creacion: serverTimestamp()
    });

    await updateProfile(user, {
        displayName: credentials.name
    });
    await sendEmailVerification(user)
};

export const passwordReset = async (credentials) => {
    init();
    await sendPasswordResetEmail(auth, credentials.email);
};