import "./viewquestions.css";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
export function ViewQuestions({questions,setQuestions,setEditIndex}) {
    const navigate = useNavigate();
    const username = sessionStorage.getItem("username");
    const [showMine, setShowMine] = useState(false);
    const filteredQuestions = showMine
    ? questions.filter(q => q.createdBy === username)
    : questions;
    useEffect(() => {
        fetch(`${API_URL}/api/getqns`)
        .then(res => res.json())
        .then(data => setQuestions(data))
        .catch(err => console.log(err));
    }, []);
    function handleEdit(question){
        setEditIndex(question);
        navigate("/add");
    }

    async function handleDelete(id){
        try {
            const res = await fetch(`${API_URL}/api/deleteqn/${id}`, {
            method: "DELETE",
        });

        const data = await res.json();
        setQuestions(data);

        } catch (err) {
            console.log(err);
        }
        
    }
    return (<div className="view-page">
    <h2>VIEW QUESTIONS</h2>
    <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setShowMine(false)}
          style={{
            fontWeight: !showMine ? "bold" : "normal",
            backgroundColor: !showMine ? "#2e0707" : "#f0f0f0",
            color: !showMine ? "white" : "black",
            marginRight: "5px",
          }}
        >
          All Questions
        </button>
        <button  
          onClick={() => setShowMine(true)}
          style={{
            fontWeight: showMine ? "bold" : "normal",
            backgroundColor: showMine ? "#2e0707" : "#f0f0f0",
            color: showMine ? "white" : "black",
          }}
          >
          My Questions ({questions.filter(q => q.createdBy === username).length})
        </button>
      </div>
    <table border="1">
        <thead>
            <tr>
                <th>S.no</th>
                <th>Subject</th>
                <th>Unit</th>
                <th>Question</th>
                <th>Difficulty</th>
                <th>Marks</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        
        <tbody>
            {filteredQuestions.map((question, index) => (
                <tr key={question._id}>
                    <td>{index + 1}</td>
                    <td>{question.subject}</td>
                    <td>{question.unit}</td>
                    <td>{question.question}</td>
                    <td>{question.difficulty}</td>
                    <td>{question.marks}</td>
                    <td><button onClick={() => handleEdit(question)}
                        disabled={question.createdBy !== username}
                        className={question.createdBy !== username ? "disabled-btn" : ""}
                        title={question.createdBy !== username ? "You can only edit your own questions" : ""}>Edit</button></td>

                    <td><button onClick={() => handleDelete(question._id)}
                    disabled={question.createdBy !== username}
                    className={question.createdBy !== username ? "disabled-btn" : ""}
                    title={question.createdBy !== username ? "You can only delete your own questions" : ""}>Delete</button></td>
                </tr>
            ))}
        </tbody>
    </table>

    <br></br>
    <div className="button-group">
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div> 
    </div>)
}
