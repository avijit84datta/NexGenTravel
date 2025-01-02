import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import Login from './components/Login';
import DestinationList from './components/DestinationList';
import CreateDestination from './components/CreateDestination';
import ManageDestinations from './components/ManageDestinations';
import Menu from './components/Menu';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwtToken"))
    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass isLoggedIn to Menu */}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/destinations"
                    element={isLoggedIn ? <DestinationList /> : <Navigate to="/login" />} // Protect destinations
                />
                <Route
                    path="/create-destination"
                    element={isLoggedIn ? <CreateDestination /> : <Navigate to="/login" />} // Protect create destination
                />
                <Route path="/manage-destinations"
                    element={isLoggedIn ? <ManageDestinations /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
}

export default App
