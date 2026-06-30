import { Navigate } from "react-router-dom";

export function ProtectedRoute({children})
{
    const isLoggedIn = sessionStorage.getItem("login")==="true";

    if(!isLoggedIn)
    {
        return <Navigate to="/" />;
    }

    return children;
}