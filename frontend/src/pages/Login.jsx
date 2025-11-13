import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"
import '../styles/Login.css'
import '../styles/CreateAccount.css'

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const { login, isAuthenticated } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || "Login failed. Please check your credentials.");
                return;
            }

            login(data);

            const redirectTo = location.state?.from?.pathname ?? "/home";
            navigate(redirectTo, { replace: true });
        } catch (err) {
            console.error("Login Failed", err);
            setError("We couldn't sign you in. Please try again in a moment.");
        }
    }

    return (
        <form className="login-form card" onSubmit={handleSubmit}>
            {error && (
                <div className="form-error" role="alert">
                    {error}
                </div>
            )}

            <div className="field">
                <label className="create-acct-label" htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Your Username"
                />
            </div>

            <div className="field password-wrapper">
                <label htmlFor="password">Password</label>
                <div className="input-with-eye">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                    />
                    <button
                        type="button"
                        className="eye-toggle-login"
                        onClick={() => setShowPassword(p => !p)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
            </div>

            <p className="create-acct-text">
                Don’t have an account?{" "}
                <Link to="/create-account" className="create-acct-link">
                    Create one
                </Link>
            </p>
            <button className="login-button" type="submit">Login</button>
        </form>
    );
}
