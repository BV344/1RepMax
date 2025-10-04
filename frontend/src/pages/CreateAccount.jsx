import { useState } from "react"
import '../styles/CreateAccount.css'

export default function CreateAccount() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Submitting First Name: ${firstName}, LastName: ${lastName}, Username: ${username} Password: ${password}`);

        try {
            const response = await fetch("api/create_account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                })
            });

            const data = await response.json();

            alert(data.message);
        } catch(err){
            console.error(`Could not create account. See error -> ${err}`);
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <label className="create-acct-label">
                First Name
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
            </label>
            <label className="create-acct-label">
                Last Name
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                />
            </label>
            <label className="create-acct-label">
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Create a Username"
                />
            </label>
            <label className="create-acct-label">
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a Password"
                />
            </label>
            <button className="create-acct-button" type="submit">Create Account</button>
        </form>
    )
}

