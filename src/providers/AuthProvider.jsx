import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { listenUser } from "../services/userService";

import { useInfo } from "./InfoProvider";

const AuthContext = createContext();
// TODO: cambiar literal
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        let unsubscribeUser = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
                if (!user.emailVerified && !isNewUser) {
                    auth.signOut();
                    setLoading(false);
                    return;
                }

                if (unsubscribeUser) unsubscribeUser();

                unsubscribeUser = listenUser(user.uid, (userData) => {
                    setUser(userData);
                    setLoading(false);
                });
            } else {
                if (unsubscribeUser) unsubscribeUser();
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeUser) unsubscribeUser();
        };
    }, []);

    const value = useMemo(() => ({
        user: user,
        loading: loading
    }), [user, loading]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthSession = () => useContext(AuthContext);