import { Navigate } from "react-router-dom";
import { useAuthSession } from "./AuthProvider";
import LoadingComponent from "../components/utilsComponents/LoadingComponent";

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuthSession();

    if (loading) {
        return <LoadingComponent />;
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};