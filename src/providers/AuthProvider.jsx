import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

import { useInfo } from "./InfoProvider";

const AuthContext = createContext();
// TODO: cambiar literal
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addMessage } = useInfo();



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
                if (!user.emailVerified && !isNewUser) {
                    addMessage("Please verify your email address", "error");
                    auth.signOut();
                    return;
                }
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
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