import { useReducer, useState } from "react";
import { useLoading } from "../providers/LoadingProvider";
import { useInfo } from "../providers/InfoProvider";
import { loginWithEmail, signUpWithGoogle, signUpWithGithub, signUpWithEmailAndPassword, passwordReset } from "../services/authService";
import { useTranslation } from "react-i18next";
import authReducer from "../reducers/authReducer";
import { initialState } from "../reducers/authReducer";

export const useAuth = () => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    const { t } = useTranslation();
    const { setLoading } = useLoading();
    const { addMessage } = useInfo();


    const handleLogin = async (e) => {
        e.preventDefault();
        const emailVacio = state.auth.email === '';
        const passwordVacia = state.auth.password === '';

        if (emailVacio || passwordVacia) {
            dispatch({ type: 'SET_ERRORS_LOGIN', payload: { email: emailVacio, password: passwordVacia } });
            addMessage(t("completeFields"), "error");
            return;
        }
        const emailInvalido = !state.auth.email.includes("@");
        const passwordCorta = state.auth.password.length < 8;

        if (emailInvalido || passwordCorta) {
            dispatch({ type: 'SET_ERRORS_LOGIN', payload: { email: emailInvalido, password: passwordCorta } });
            if (emailInvalido) addMessage(t("emailInvalid"), "error");
            else if (passwordCorta) addMessage(t("passwordInvalid"), "error");

            return;
        }

        dispatch({ type: 'SET_ERRORS_LOGIN', payload: { email: false, password: false } });
        try {
            const user = await loginWithEmail(state.auth.email, state.auth.password);
            if (user) {
                addMessage(t("userCreated"), "success");
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/too-many-requests':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    addMessage(t("errorLogin"), "error");
                    dispatch({ type: 'SET_ERRORS_LOGIN', payload: { email: true, password: true } });
                    break;
                default:
                    addMessage(t("unexpectedError"), "error");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleSignUpWithGoogle = async () => {
        try {
            setLoading(true);
            const user = await signUpWithGoogle();
            if (user) {
                addMessage(t("userCreated"), "success");
            }
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
    }

    const handleSignUpWithGithub = async () => {
        try {
            setLoading(true);
            const user = await signUpWithGithub();
            if (user) {
                addMessage(t("userCreated"), "success");
            }
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
    }

    const handleSignUp = async (e, onClose) => {
        e.preventDefault();
        const nombreVacio = state.auth.nombre === '';
        const emailVacio = state.auth.email === '';
        const passwordVacia = state.auth.password === '';
        const passwordConfirmationVacia = state.auth.passwordConfirmation === '';

        if (nombreVacio || emailVacio || passwordVacia || passwordConfirmationVacia) {
            dispatch({ type: 'SET_ERRORS_SIGNUP', payload: { nombre: nombreVacio, email: emailVacio, password: passwordVacia, passwordConfirmation: passwordConfirmationVacia } });
            addMessage(t("completeFields"), "error");
            return;
        }
        const emailInvalido = !state.auth.email.includes("@");
        const passwordCorta = state.auth.password.length < 8;
        const passwordConfirmationInvalida = state.auth.password !== state.auth.passwordConfirmation;

        if (emailInvalido || passwordCorta || passwordConfirmationInvalida) {
            dispatch({ type: 'SET_ERRORS_SIGNUP', payload: { email: emailInvalido, password: passwordCorta, passwordConfirmation: passwordConfirmationInvalida } });
            if (emailInvalido) addMessage(t("emailInvalid"), "error");
            else if (passwordCorta) addMessage(t("passwordInvalid"), "error");
            else if (passwordConfirmationInvalida) addMessage(t("passwordConfirmationInvalid"), "error");

            return;
        }

        dispatch({ type: 'SET_ERRORS_SIGNUP', payload: { nombre: false, email: false, password: false, passwordConfirmation: false } });
        try {
            setLoading(true);
            await signUpWithEmailAndPassword(state.auth);
            addMessage(t("emailVerificationSent"), "info");
            onClose();
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    addMessage(t("emailAlreadyInUse"), "error");
                    dispatch({ type: 'SET_ERRORS_SIGNUP', payload: { ...state.signUpErrors, email: true } });
                    break;
                default:
                    addMessage(t("unexpectedError"), "error");
                    console.log(error);
                    break;
            }
        } finally {
            setLoading(false);
        }
    }

    const handlePasswordReset = async (e, onClose) => {
        e.preventDefault();
        const emailVacio = state.auth.email === '';

        if (emailVacio) {
            dispatch({ type: 'SET_ERRORS_PASSWORD_RESET', payload: { ...state.passwordResetErrors, email: emailVacio } });
            addMessage(t("completeFields"), "error");
            return;
        }
        const emailInvalido = !state.auth.email.includes("@");

        if (emailInvalido) {
            dispatch({ type: 'SET_ERRORS_PASSWORD_RESET', payload: { ...state.passwordResetErrors, email: emailInvalido } });
            addMessage(t("emailInvalid"), "error");
            return;
        }

        dispatch({ type: 'SET_ERRORS_PASSWORD_RESET', payload: { ...state.passwordResetErrors, email: false } });
        try {
            setLoading(true);
            await passwordReset(state.auth);
            onClose();
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    addMessage(t("userNotFound"), "error");
                    dispatch({ type: 'SET_ERRORS_PASSWORD_RESET', payload: { ...state.passwordResetErrors, email: true } });
                    break;
                default:
                    addMessage(t("unexpectedError"), "error");
                    console.log(error);
                    break;
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        state,
        dispatch,
        handleLogin,
        handleSignUpWithGoogle,
        handleSignUpWithGithub,
        handleSignUp,
        handlePasswordReset
    }
}