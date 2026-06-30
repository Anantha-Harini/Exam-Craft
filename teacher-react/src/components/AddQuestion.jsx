import "./addquestion.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/api";
export function AddQuestion({questions,setQuestions,editIndex,setEditIndex}) {
    const navigate=useNavigate();
    const username = sessionStorage.getItem("username");
    const [subjects,setsubjects]=useState([]);
    const [UnitsList,setUnitsList]=useState([]);
    const [formData, setFormData] = useState({
        subject:"",
        unit:"",
        question:"",
        difficulty:"",
        marks:""
    });
    
    useEffect(() => {
        fetch(`${API_URL}/api/listsubject`)
            .then(res => res.json())
            .then(data => setsubjects(data))
            .catch(err => console.log(err));
    }, []);

    useEffect(()=>{
        if(editIndex!==null){
            const data=editIndex;
            setFormData(data);
            const selectedsub=subjects.find(s=>s.name===data.subject);
            if(selectedsub)
            {
                setUnitsList(selectedsub.units);
            }
        }
    },[editIndex,subjects]);

    function handleChange(e) {
        setFormData({...formData,[e.target.name]:e.target.value});
        if(e.target.name=="subject")
        {
            const selectedsub=subjects.find(s=>s.name===e.target.value);
            if(selectedsub)
            {
                setUnitsList(selectedsub.units);
            }
            else{
                setUnitsList([]);
            }
        }
    }

    async function handleSubmit (e) {
        e.preventDefault();
        try {
            let url=`${API_URL}/api/addqn`;
            let method="POST";
            if(editIndex!==null){
                url=`${API_URL}/api/updateqn/${editIndex._id}`;
                method="PUT";
            }
            const res = await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                subject: formData.subject,
                unit: formData.unit,
                qn: formData.question,
                difficulty: formData.difficulty,
                marks: formData.marks,
                tname: username
            }),
        });

        const data = await res.json();
        setQuestions(data);
        setEditIndex(null);
        setFormData({
            subject:"",
            unit:"",
            question:"",
            difficulty:"",
            marks:""
        });
        navigate("/view")
    }catch(err)
        {
            console.log(err)
        }
    }

    return (<div className="add-page">
    <h2><i>{editIndex !== null ? "UPDATE QUESTION" : "ADD QUESTION"}</i></h2>
    <form onSubmit={handleSubmit} className="form-card">
    <table>
        <thead></thead>
        <tbody>
            <tr>
                <td>Subject:</td>
                <td><select name="subject" value={formData.subject} onChange={handleChange} >
                    <option value="">Select Subject</option>
                    {subjects.map((sub,index)=>(<option key={index} value={sub.name}>{sub.name}</option>))}
                </select></td>
            </tr>  
            <tr>
                <td>Unit:</td>
                <td><select  name="unit" value={formData.unit} onChange={handleChange} >
                    <option value="">Select Unit</option>
                    {UnitsList.map((unit,index)=>(<option key={index} value={unit}>{unit}</option>))}
                </select></td>
            </tr> 
            <tr>
                <td>Question:</td>
                <td><textarea name="question" value={formData.question} onChange={handleChange} /><h6>{formData.question.length}/200 characters</h6></td>
            </tr>
            <tr>
                <td>Difficulty:</td>
                <td><select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select></td>
            </tr>
            <tr>
                <td>Marks:</td>
                <td><input type="number" name="marks" value={formData.marks} min="0" max="100" onChange={handleChange} /></td>
            </tr>     
        </tbody>
    </table><br></br>
        <div className="button-group">
            <button type="submit">{editIndex !== null ? "Update Question" : "Add Question"}</button>
        </div><br></br>
    </form>
    <div className="button-group">
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
    </div>
        </div>
    )
}
