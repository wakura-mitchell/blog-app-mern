import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Home } from './pages/Home'
import { Reading } from './pages/Reading'
import { CreateBlog } from './pages/CreateBlog'
import { Profile } from './pages/Profile'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Navbar } from './components/Navbar'
import { Layout } from './components/Layout'
Navbar
Layout


function App() {
    // Pages for blogging app:
    // 1 Landing Page
    // 2 Home Page after login (filtered by recency)
    // 3 Read Blog Page
    // 4 Create Blog Page
    // 5 profile Page
    // 6 about Page
    // 7 contact Page
    return (
        // creating a wrapper for the app
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<Layout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/read" element={<Reading />} />
                        <Route path="/create" element={<CreateBlog />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App

