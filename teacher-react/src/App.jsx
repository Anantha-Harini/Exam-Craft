import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./components/Dashboard";
import { AddQuestion } from "./components/AddQuestion";
import { ViewQuestions } from "./components/ViewQuestions";
import { Suspense, useState } from "react";
//import './components/styles.css'
import './App.css'

export function App() {
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  return (

    <>
      <div className="header">
        <title>EXAM CRAFT- Faculty Portal</title>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddQuestion questions={questions} setQuestions={setQuestions} editIndex={editIndex} setEditIndex={setEditIndex}></AddQuestion></ProtectedRoute>} />
          <Route path="/view" element={<ProtectedRoute><ViewQuestions questions={questions} setQuestions={setQuestions} setEditIndex={setEditIndex}></ViewQuestions></ProtectedRoute>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
