import { useState, useMemo } from "react"
import '../styles/CreateAccount.css'

export default function CreateAccount() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const passwordEntered = password.length > 0 && confirmPassword.length > 0;
    const passwordMatch = useMemo(() => password === confirmPassword &&  passwordEntered,
        [password, confirmPassword, passwordEntered]
    );

    const canSubmit =
        firstName.trim() &&
        lastName.trim() &&
        username.trim() &&
        password.length >= 12 &&
        passwordMatch &&
        !isSubmitting;


    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Submitting First Name: ${firstName}, LastName: ${lastName}, Username: ${username} Password: ${password}`);
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/create_account", {
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

            if(!response.ok){
                throw new Error(data?.message || "Failed to Create Account");
            }

            alert(data.message || "Account Created");
            // TODO: Navigate to Homepage

        } catch(err){
            console.error(`Could not create account: ${err}`);
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form className="create-acct-form card" onSubmit={handleSubmit} noValidate>
            <div className="field">
                <label className="create-acct-label" htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
            </div>

            <div className="field">
                <label className="create-acct-label" htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
            </div>

            <div className="field">
                <label className="create-acct-label" htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Create a Username"
                    required
                />
            </div>


            <div className="field password-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a Password"
                    minLength={8}
                    required
                    aria-describedby="passwordHelp"
                />
                <button
                    type="button"
                    className="eye-toggle-create-acct"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? "🙈" : "👁️"}
                </button>
                <small id="passwordHelp" className="hint">
                    Use at least 8 characters.
                </small>
            </div>

            <div className={["field", "confirm-wrapper"].join(" ")}>
                <label className="create-acct-label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    aria-invalid="false"
                />

                {/* Inline Status Chip */}
                {passwordEntered && (
                    <div className={`chip ${passwordMatch ? "chip-ok" : "chip-warn"}`}>
                        {passwordMatch ? "Match" : "No match"}
                    </div>
                )}
            </div>

            <button
                className={`create-acct-button ${!canSubmit ? "btn-disabled" : ""}`}
                type="submit"
                disabled={!canSubmit}
                aria-disabled={!canSubmit}
            >
                {isSubmitting ? "Creating..." : "Create Account"}
            </button>
        </form>
    );
}

