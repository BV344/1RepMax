import {useState} from "react"
import '../styles/Login.css'

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`From Submitted Username: ${username} & Password: ${password}`);

        try {
            await fetch("api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
        } catch(err) {
            console.error(`Login Failed with Error: ${err}`);
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
            <button className="login-button" type="submit">Login</button>
        </form>
    );
}
