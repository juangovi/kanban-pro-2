import { useState } from "react";
import { useLoading } from "../providers/LoadingProvider";
import { useInfo } from "../providers/InfoProvider";
import { loginWithEmail, signUpWithGoogle, signUpWithGithub, signUpWithEmailAndPassword, passwordReset } from "../services/authService";
import { useTranslation } from "react-i18next";


export const useAuth = () => {

    const [credentials, setcredentials] = useState({
        nombre: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    const [erroresSignUp, setErroresSignUp] = useState({
        nombre: false,
        email: false,
        password: false,
        passwordConfirmation: false
    });

    const [erroresPasswordReset, setErroresPasswordReset] = useState({
        email: false
    });

    const [credentialsPasswordReset, setCredentialsPasswordReset] = useState({
        email: ''
    });



    const { t } = useTranslation();
    const { setLoading } = useLoading();
    const { addMessage } = useInfo();
    const [errores, setErrores] = useState({
        email: false,
        password: false
    })

    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })

    const handleLogin = (e) => {
        e.preventDefault();
        const emailVacio = credenciales.email === '';
        const passwordVacia = credenciales.password === '';

        if (emailVacio || passwordVacia) {
            setErrores({ email: emailVacio, password: passwordVacia });
            addMessage(t("completeFields"), "error");
            return;
        }
        const emailInvalido = !credenciales.email.includes("@");
        const passwordCorta = credenciales.password.length < 8;

        if (emailInvalido || passwordCorta) {
            setErrores({ email: emailInvalido, password: passwordCorta });
            if (emailInvalido) addMessage(t("emailInvalid"), "error");
            else if (passwordCorta) addMessage(t("passwordInvalid"), "error");

            return;
        }

        setErrores({ email: false, password: false });
        loginWithEmail(credenciales.email, credenciales.password, setLoading, addMessage, t, setErrores);
    }

    const handleSignUpWithGoogle = async () => {
        const user = await signUpWithGoogle(setLoading, addMessage, t);
        if (user) {
            addMessage(t("userCreated"), "success");
        }
    }

    const handleSignUpWithGithub = async () => {
        const user = await signUpWithGithub(setLoading, addMessage, t);
        if (user) {
            addMessage(t("userCreated"), "success");
        }
    }
    const handleSignUp = (e, onClose) => {
        e.preventDefault();
        const nombreVacio = credentials.nombre === '';
        const emailVacio = credentials.email === '';
        const passwordVacia = credentials.password === '';
        const passwordConfirmationVacia = credentials.passwordConfirmation === '';

        if (nombreVacio || emailVacio || passwordVacia || passwordConfirmationVacia) {
            setErroresSignUp({ nombre: nombreVacio, email: emailVacio, password: passwordVacia, passwordConfirmation: passwordConfirmationVacia });
            addMessage(t("completeFields"), "error");
            return;
        }
        const emailInvalido = !credentials.email.includes("@");
        const passwordCorta = credentials.password.length < 8;
        const passwordConfirmationInvalida = credentials.password !== credentials.passwordConfirmation;

        if (emailInvalido || passwordCorta || passwordConfirmationInvalida) {
            setErroresSignUp({ email: emailInvalido, password: passwordCorta, passwordConfirmation: passwordConfirmationInvalida });
            if (emailInvalido) addMessage(t("emailInvalid"), "error");
            else if (passwordCorta) addMessage(t("passwordInvalid"), "error");
            else if (passwordConfirmationInvalida) addMessage(t("passwordConfirmationInvalid"), "error");

            return;
        }

        setErroresSignUp({ nombre: false, email: false, password: false, passwordConfirmation: false });
        signUpWithEmailAndPassword(setLoading, addMessage, t, credentials, onClose, setErroresSignUp);
    }

    const handlePasswordReset = (e, onClose) => {
        e.preventDefault();
        const emailVacio = credentialsPasswordReset.email === '';

        if (emailVacio) {
            setErroresPasswordReset({ email: emailVacio });
            addMessage(t("completeFields"), "error");
            return;
        }
        const emailInvalido = !credentialsPasswordReset.email.includes("@");

        if (emailInvalido) {
            setErroresPasswordReset({ email: emailInvalido });
            addMessage(t("emailInvalid"), "error");
            return;
        }

        setErroresPasswordReset({ email: false });
        passwordReset(setLoading, addMessage, t, credentialsPasswordReset, onClose, setErroresPasswordReset);
    }

    return {
        handleLogin,
        credenciales,
        setCredenciales,
        errores,
        setErrores,
        handleSignUpWithGoogle,
        handleSignUpWithGithub,
        handleSignUp,
        credentials,
        setcredentials,
        erroresSignUp,
        setErroresSignUp,
        handlePasswordReset,
        credentialsPasswordReset,
        setCredentialsPasswordReset,
        erroresPasswordReset,
        setErroresPasswordReset
    }
}