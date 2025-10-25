import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [student, setStudent] = useState({ name: "", email: "", course: "" });
  const [students, setStudents] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/students", student);
      alert("Student Registered!");
      setStudent({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (err) {
      alert("Error: " + err.response?.data?.error);
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  useEffect(() => { fetchStudents(); }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Registration</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
        <input name="course" placeholder="Course" value={student.course} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      <h2>Registered Students</h2>
      <ul>
        {students.map(s => (
          <li key={s._id}>{s.name} - {s.email} - {s.course}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
