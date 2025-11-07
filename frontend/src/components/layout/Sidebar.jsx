import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import sidebarLogo from "../../assets/sidebar-logo.svg";
import "../../styles/Sidebar.css";



export default function Sidebar(){
    const [collapsed, setCollapsed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);


    const handleLogout = () => {
        // TODO: plug into your auth
        // signOut();
        console.log("Logging out…");
    };

    // Close on Click Outside
    useEffect(() => {
        function onDocClick(e) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        function onEsc(e) {
            if (e.key === "Escape") setMenuOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);


    return (
        <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
            <button
                className="collapse-btn"
                onClick={() => setCollapsed(v => !v)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-expanded={!collapsed}
                title={collapsed ? "Expand" : "Collapse"}
            >
                <img src={sidebarLogo} alt="Sidebar logo" className="icon" />
            </button>

            {/* Horizontal Page List */}
            <nav className="nav nav-horizontal" aria-label="Primary">
                <NavLink to="/dashboard" className="nav-pill">
                    <span className="nav-icon" aria-hidden>📊</span>
                    <span className="nav-label">Dashboard</span>
                </NavLink>

                <NavLink to="/1repmax" className="nav-pill">
                    <span className="nav-icon" aria-hidden>🏋️</span>
                    <span className="nav-label">1RepMax</span>
                </NavLink>

                <NavLink to="/workout-log" className="nav-pill">
                    <span className="nav-icon" aria-hidden>📈</span>
                    <span className="nav-label">Workout Log</span>
                </NavLink>
            </nav>

            {/* Account Strip with Pop Over Menu */}
            <footer className="sidebar-footer" ref={menuRef}>
                <button
                    type="button"
                    className="user-chip user-chip--button"
                    onClick={() => setMenuOpen(v => !v)}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    aria-controls="account-menu"
                    title="Your Profile"
                >
                    <span className="user-avatar" aria-hidden>👤</span>
                    <span className="user-name">Username</span>
                    <span className="chev" aria-hidden>▾</span>
                </button>

                {menuOpen && (
                    <div id="account-menu" role="menu" className="account-menu">
                        <div role="account-menu-email" aria-hidden>
                            tempuser@1repmax.dev
                        </div>
                        <button
                            role="menuitem"
                            className="account-menu-item"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </footer>
        </aside>
    );
}