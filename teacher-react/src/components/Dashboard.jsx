//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
export function Dashboard() {
    const navigate = useNavigate();
    return (<div className="dashboard-page">
        <h1>EXAM CRAFT - Faculty Portal</h1>
        <br></br>

        <div className="dashboard-cards">
            <div className="dashboard-card add-card">
                <button onClick={() => navigate("/add")}>Add Question</button>
            </div>
            <br></br><br></br>
            <div className="dashboard-card view-card">
                <button onClick={() => navigate("/view")}>View Questions</button>
            </div>
            <br></br><br></br>
            <div className="dashboard-card logout-card">
                <button onClick={() => {
                    sessionStorage.removeItem("login");
                    navigate("/");
                }}>Logout</button>
            </div>
        </div>
    </div>)
}