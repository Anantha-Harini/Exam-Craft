import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { API_URL } from "../services/api";
export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    return (<>
        <div className="login-container">
            <div className="login-card">
                <h2><i>EXAM CRAFT  Faculty Login</i></h2>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td><input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <div className="button-group">
                    <button onClick={async () => {
                        if (username === "" || password === "") {
                            setError("Please enter both username and password");
                            return;
                        }
                        //http://localhost:5000
                        try {
                            const res = await fetch(`${API_URL}/api/login`, {
                                method: "POST", headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ username: username, password: password, role: "teacher" })
                            });
                            const text = await res.text();
                            const data = text ? JSON.parse(text) : {};
                            if (data.success) {
                                setError("");
                                sessionStorage.setItem("login", "true");
                                sessionStorage.setItem("username", username)
                                navigate("/dashboard");
                            }
                            else {
                                setError("Invalid username or password");
                                setUsername("");
                                setPassword("");
                            }
                        } catch (err) {
                            console.log(err);
                            setError("Server error");
                        }
                    }}>Login</button>
                </div><br></br>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    </>)
}
