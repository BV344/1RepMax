import Sidebar from "../components/layout/Sidebar.jsx";
import "../styles/Home.css";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="home-layout">
            <Sidebar />
            <main className="home-main">
                <h1>Welcome back{user ? `, ${user.firstName}` : " to 1RepMax"}</h1>
                <p>This is your dashboard overview.</p>
            </main>
        </div>
    );
}
