import { useForm } from "react-hook-form";
import axios from "axios";
import './App.css'

export default function Form(props) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    addStudent(data);
  };

  // POST FORM DATA TO MYSQL DB
  const addStudent = (data) => {
    axios.post("http://localhost:3000/wizards", data).then(() => {
      props.setStudents([...props.students, { data }]);
    });
    // RESETS THE FORM
    reset({ name: null, id: null, family: null, wand: null })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4>Add a Student</h4>
      <div className="formControl">
        <label htmlFor="name">Name:</label>
        <input {...register('name')} type="text" name="name" id="name" required />
      </div>
      <div className="formControl">
        <label htmlFor="id">Id:</label>
        <input {...register('id')} type="number" min="11231" name="id" id="id" required />
      </div>
      <div className="formControl">
        <label htmlFor="family">Family:</label>
        <input {...register('family')} type="text" name="family" id="family" required />
      </div>
      <div className="formControl">
        <label htmlFor="wand">Wand:</label>
        <input {...register('wand')} type="text" name="wand" id="wand" required />
      </div>
      <div className="formControl">
        <input type="submit" value="Confirm" />
      </div>
    </form>
  )
}
