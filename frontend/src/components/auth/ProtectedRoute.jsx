import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, initialising } = useAuth();
    const location = useLocation();

    if (initialising) {
        return (
            <div className="protected-route-loading" role="status" aria-live="polite">
                Checking your session…
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    return children;
}
