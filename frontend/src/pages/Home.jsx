import Sidebar from "../components/layout/Sidebar.jsx";
import "../styles/Home.css";

export default function Home() {
    return (
        <div className="home-layout">
            <Sidebar />
            <main className="home-main">
                <h1>Welcome to 1RepMax</h1>
                <p>This is your dashboard overview.</p>
            </main>
        </div>
    );
}
