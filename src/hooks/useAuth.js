import { useReducer, useState } from "react";
import { useLoading } from "../providers/LoadingProvider";
import { useInfo } from "../providers/InfoProvider";
import { loginWithEmail, signUpWithGoogle, signUpWithGithub, signUpWithEmailAndPassword, passwordReset } from "../services/authService";
import { useTranslation } from "react-i18next";
import authReducer from "../reducers/authReducer";
import { initialState } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

export const useAuth = () => {

    const navigate = useNavigate();

    const [state, dispatch] = useReducer(authReducer, initialState);

    const { t } = useTranslation();
    const { setLoading } = useLoading();
    const { addMessage } = useInfo();

    const loginSchema = z.object({
        email: z.email(t("emailInvalid")),
        password: z.string().min(8, t("passwordInvalid")),
    });

    const signUpSchema = z.object({
        name: z.string().min(3, t("nameInvalid")),
        email: z.email(t("emailInvalid")),
        password: z.string().min(8, t("passwordInvalid")),
        passwordConfirmation: z.string().min(8, t("passwordConfirmationInvalid")),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: t("passwordConfirmationInvalid"),
        path: ["passwordConfirmation"],
    });

    const passwordResetSchema = z.object({
        email: z.email(t("emailInvalid")),
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = loginSchema.safeParse(state.auth);

        if (!result.success) {
            const newErrors = {};
            addMessage(t("completeFields"), "error");
            result.error.issues.forEach(issue => {
                newErrors[issue.path[0]] = issue.message;
            });
            dispatch({ type: 'SET_ERRORS_LOGIN', payload: newErrors });
            return;
        }

        dispatch({ type: 'SET_ERRORS_LOGIN', payload: { email: "", password: "" } });
        try {
            const user = await loginWithEmail(state.auth.email, state.auth.password);
            if (user?.emailVerified) {
                navigate("/");
            } else {
                addMessage(t("emailVerificationSent"), "info");
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                case 'auth/too-many-requests':
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    addMessage(t("errorLogin"), "error");
                    dispatch({ type: 'SET_ERRORS_LOGIN', payload: { email: t("emailInvalid"), password: t("passwordInvalid") } });
                    break;
                default:
                    console.log(error);
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

        const result = signUpSchema.safeParse(state.auth);

        if (!result.success) {
            const newErrors = {};
            addMessage(t("completeFields"), "error");
            result.error.issues.forEach(issue => {
                newErrors[issue.path[0]] = issue.message;
            });
            dispatch({ type: 'SET_ERRORS_SIGNUP', payload: newErrors });
            return;
        }
        dispatch({ type: 'SET_ERRORS_SIGNUP', payload: { nombre: "", email: "", password: "", passwordConfirmation: "" } });
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

        const result = passwordResetSchema.safeParse(state.auth);

        if (!result.success) {
            const newErrors = {};
            addMessage(t("completeFields"), "error");
            result.error.issues.forEach(issue => {
                newErrors[issue.path[0]] = issue.message;
            });
            dispatch({ type: 'SET_ERRORS_PASSWORD_RESET', payload: newErrors });
            return;
        }
        dispatch({ type: 'SET_ERRORS_PASSWORD_RESET', payload: { email: "" } });
        try {
            setLoading(true);
            await passwordReset(state.auth);
            addMessage(t("passwordResetSent"), "info");
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