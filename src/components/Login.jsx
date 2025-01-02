import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Perform login validation or API call
        try {
            const response = await axios.post("http://localhost:5022/api/Auth", {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            onLogin(); // Notify the app that the user is logged in
            navigate('/destinations');
        } catch (err) {
            setError("Invalid username or password" + err);
        }        
    };

    return (
        <div style={{ margin: "20px", textAlign: "center" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};




export default Login;
