import { Navigate } from "react-router-dom";
import { useAuthSession } from "./AuthProvider";
import LoadingComponent from "../components/utilsComponents/LoadingComponent";

export const ProtectedRoute = ({ children }) => {
    const { value } = useAuthSession();

    if (value.loading) {
        return <LoadingComponent />;
    }

    if (!value.user) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};