import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

function readStoredToken() {
    try {
        return localStorage.getItem("access_token");
    } catch (error) {
        console.error("Unable to read stored token", error);
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => readStoredToken());
    const [user, setUser] = useState(null);
    const [initialising, setInitialising] = useState(true);

    useEffect(() => {
        if (!token) {
            setUser(null);
            setInitialising(false);
            return;
        }

        let isCancelled = false;

        async function loadSession() {
            try {
                const response = await fetch("/api/session", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Session request failed with status ${response.status}`);
                }

                const data = await response.json();
                if (!isCancelled) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to load existing session", error);
                if (!isCancelled) {
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem("access_token");
                }
            } finally {
                if (!isCancelled) {
                    setInitialising(false);
                }
            }
        }

        loadSession();

        return () => {
            isCancelled = true;
        };
    }, [token]);

    const value = useMemo(() => ({
        token,
        user,
        isAuthenticated: Boolean(token && user),
        initialising,
        login: ({ access_token: newToken, user: nextUser }) => {
            localStorage.setItem("access_token", newToken);
            setToken(newToken);
            setUser(nextUser);
            setInitialising(false);
        },
        logout: () => {
            localStorage.removeItem("access_token");
            setToken(null);
            setUser(null);
            setInitialising(false);
        },
    }), [token, user, initialising]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
