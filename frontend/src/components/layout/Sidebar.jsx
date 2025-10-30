import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css"


const nav = [
    { to: "/home", label: "Home", icon: "🏠"},
    {to: "/1repmax", label: "1RepMax", icon: "🏋️"},
    {to: "/workout-log", label: "Workout Log", icon: "📈"},
    {to: "/settings", label: "Settings", icon: "⚙️"}
    ];


export default function Sidebar(){
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Top Bar */}
            <div className="sb-topbar">
                <button
                    className="button-iconbtn"
                    aria-label="Open sidebar"
                    onClick={() => setOpen(true)}
                >
                    ☰
                </button>
                <strong>1RepMax</strong>
                <button
                    className="button-iconbtn"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    onClick={() => setCollapsed((v) => !v)}
                    title={collapsed ? "Expand" : "Collapse"}
                >
                    {collapsed ? "›" : "‹"}
                </button>
            </div>

            {/* Overlay (mobile) */}
            {open && <button className="sb-overlay" aria-label="Close overlay" onClick={() => setOpen(false)} />}

            {/* Sidebar */}
            <nav
                className={`sb-nav ${open ? "is-open " : ""}${collapsed ? "collapsed" : ""}`}
                role="navigation"
                aria-label="Sidebar"
                aria-expanded={open ? "true" : "false"}
            >
                <div className="cluster">
                    <button className="button-iconbtn" aria-label="Close sidebar" onClick={() => setOpen(false)}>
                        ✕
                    </button>
                </div>

                {nav.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `sb-link${isActive ? " sb-link--active" : ""}`}
                        title={collapsed ? item.label : undefined}
                        onClick={() => setOpen(false)}
                    >
                        <span className="sb-icon" aria-hidden="true">{item.icon}</span>
                        {!collapsed && <span className="sb-text">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Footer Actions */}
            <div className={`sb-foot${collapsed ? " is-collapsed": ""}`}>
                <button className="sb-signout-btn">{collapsed ? "↩︎" : "Sign Out ↩︎"}</button>
            </div>
        </>
    );
}