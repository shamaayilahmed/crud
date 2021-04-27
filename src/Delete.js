import axios from "axios";
import './App.css'

export default function Delete(props) {
  const deleteStudent = (e) => {
    e.preventDefault();
    // DELETE THE SPECIFIC DATA WHICH MATCHES THE ID
    axios.delete(`http://localhost:3000/wizards/${props.id}`).then((res) => {
      props.setStudents(props.students.filter((item) => {
        return item.id !== props.id;
      })
      );
    });
  };

  return (
    <form id="delete">
      <div className="formControl" style={{ marginTop: '-15px' }} onClick={(e) => deleteStudent(e)}>
        <input type="submit" value="Delete" />
      </div>
    </form>
  );
}
