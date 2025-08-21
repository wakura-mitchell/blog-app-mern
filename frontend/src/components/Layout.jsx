// app layout component
import { Navbar } from "./Navbar"
import { Outlet } from "react-router-dom"


import React from 'react'

export const Layout = () => {
    return (
        <div>
            {/* Navbar component for navigation */}
            <Navbar />
            {/* Outlet renders the matched child route component */}
            <Outlet />
        </div>
    )
}
