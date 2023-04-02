import React from "react";
import { Outlet } from "react-router-dom";
import './app.css'

export function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-red-50">the spot</header>
            <div className="flex-1 flex flex-col sm:flex-row">
                <main className="flex-1 bg-indigo-100"><Outlet /></main>

                <nav className="order-first sm:w-32 bg-purple-200">Sidebar</nav>

                <aside className="sm:w-32 bg-yellow-100">Right Sidebar</aside>
            </div>
            <footer className="bg-gray-100">Footer</footer>
        </div>
    )
}