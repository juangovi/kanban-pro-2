import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LoadingComponent from "../components/LoadingComponent";

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingComponent />;
    }

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return children;
};