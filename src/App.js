import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Form from './Form'
import Edit from './Edit'
import Delete from './Delete'

function App() {
  // 1. STATES
  const [students, setStudents] = useState([]);
  const [hide, setHide] = useState(false);
  // 2. GET DATA AND SET STATES
  const getStudents = () => {
    axios.get("http://localhost:3000/wizards").then((res) => {
      setStudents(res.data);
    });
  };
  // 3. REAL TIME UPDATION USING USE-EFFECT
  useEffect(() => {
    getStudents();
  }, [students]);
  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#fff', fontSize: 'calc(16px + 2vmax)', textShadow: '0 0 5px  darkcyan,0 0 10px #4b4f58,0 0 15px rgba(255, 255, 255, 0.4),0 0 20px #46484d9d,0 0 25px #555557' }}>HOGWARTS REGISTER</h1>

      {/* STUDENTS ARRAY AND SETSTUDENTS FUNCTION IS SENT TO ALL THE COMPONENTS FOR MANIPULATION */}
      <Form students={students} setStudents={setStudents} />

      {/* TRIGGERS THE EDIT OPTIONS */}
      {!hide ?
        <h4 onClick={() => setHide(!hide)} style={{ textAlign: 'center', color: 'white', cursor: 'pointer' }}>Edit the list</h4> : <h4 onClick={() => setHide(!hide)} style={{ textAlign: 'center', color: 'white', cursor: 'pointer' }}>Collapse</h4>}

      <div className="students">
        {students.map((item) => {
          return (
            <div className="box">
              <h4>Name: {item.name}</h4>
              <p>Family: {item.family}</p>
              <p>Wand: {item.wand}</p>
              {hide ?
                <>
                  {/* ID OF THE SPECIFIC STUDENT SENT, AS EDIT AND DELETE REQUIRES ID */}
                  <Edit id={item.id} students={students} setStudents={setStudents} />
                  <Delete id={item.id} students={students} setStudents={setStudents} />
                </>
                : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
