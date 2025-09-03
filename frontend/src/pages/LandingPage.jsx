import React from 'react'
import { CreateUser } from '../components/createUser'
CreateUser

// this page is going to have 3 view
// 0. landing page
// 1. Login
// 2. Register
export const LandingPage = () => {
    return (
        <div>
            <CreateUser />
        </div>
    )
}
