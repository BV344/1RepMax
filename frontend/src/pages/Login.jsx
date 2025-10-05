import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import '../styles/Login.css'

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`From Submitted Username: ${username} & Password: ${password}`);

        try {
            const response = await fetch("api/login", {
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
        <form onSubmit={handleSubmit}>
            <label className="login-label">
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Your Username"
                />
            </label>
            <label className="login-label">
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                />
            </label>
            <Link className="create-acct-link" to="/create-account">Create an Account</Link>
            <button className="login-button" type="submit">Login</button>
        </form>
    );
}
