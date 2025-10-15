import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import '../styles/Login.css'
import '../styles/CreateAccount.css'

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`From Submitted Username: ${username} & Password: ${password}`);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })

            const data = await response.json();

            console.log("Checking Response: ", data.msg);
            if(response.ok){
                // Store JWT for later authentication
                localStorage.setItem("access_token", data.access_token);

                //Redirect to Home.jsx
                navigate("/home");
            } else{
                alert(data.msg || "Login Failed. Please Check Your Credentials!");
            }

        } catch(err) {
            console.error(`Login Failed with Error: ${err}`);
            alert("Something went wrong whist Logging In. Try again Later");
        }

    }

    return (
        <form className="login-form card" onSubmit={handleSubmit}>
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
