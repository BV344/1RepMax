import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import sidebarLogo from "../../assets/sidebar-logo.svg";
import "../../styles/Sidebar.css";

const NAV_ITEMS = [
    {
        to: "/dashboard",
        icon: "📊",
        label: "Dashboard",
        title: "Overview & analytics",
    },
    {
        to: "/1repmax",
        icon: "🏋️",
        label: "1RM Calculator",
        title: "Plan your next personal best",
    },
    {
        to: "/workout-log",
        icon: "📈",
        label: "Workout Log",
        title: "Track volume & progress",
    },
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        console.log("Logging out…");
    };

    useEffect(() => {
        function onDocClick(event) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(event.target)) setMenuOpen(false);
        }
        function onEsc(event) {
            if (event.key === "Escape") setMenuOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    useEffect(() => {
        if (collapsed) setMenuOpen(false);
    }, [collapsed]);

    return (
        <aside className={cx("sidebar", collapsed && "is-collapsed")}>
            <div className="sidebar-header">
                <div className="brand" aria-label="1RepMax">
                    <img src={sidebarLogo} alt="" aria-hidden className="brand-mark" />
                    <span className="brand-text">1RepMax</span>
                </div>
                <button
                    type="button"
                    className="collapse-btn"
                    onClick={() => setCollapsed(value => !value)}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    aria-expanded={!collapsed}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <span className="collapse-icon" aria-hidden>
                        ‹
                    </span>
                    <span className="sr-only">Toggle sidebar</span>
                </button>
            </div>

            <nav className="nav" aria-label="Primary">
                <div className="nav-group" role="list">
                    {NAV_ITEMS.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end
                            className={({ isActive }) => cx("nav-link", isActive && "is-active")}
                            title={collapsed ? item.label : undefined}
                        >
                            <span className="nav-icon" aria-hidden>
                                {item.icon}
                            </span>
                            <span className="nav-label">{item.label}</span>
                            <span className="nav-subtitle">{item.title}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            <footer className="sidebar-footer" ref={menuRef}>
                <button
                    type="button"
                    className="user-chip"
                    onClick={() => setMenuOpen(value => !value)}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    aria-controls="account-menu"
                    title={collapsed ? "Account" : undefined}
                >
                    <span className="user-avatar" aria-hidden>
                        👤
                    </span>
                    <span className="user-meta">
                        <span className="user-name">Temp User</span>
                        <span className="user-role">Athlete</span>
                    </span>
                    <span className="chev" aria-hidden>
                        ▾
                    </span>
                    <span className="sr-only">Open account menu</span>
                </button>

                {menuOpen && (
                    <div id="account-menu" role="menu" className="account-menu">
                        <div className="account-menu-email">tempuser@1repmax.dev</div>
                        <button
                            type="button"
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
