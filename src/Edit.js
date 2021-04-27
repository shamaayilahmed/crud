import { useForm } from "react-hook-form";
import axios from "axios";
import './App.css'

export default function Edit(props) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // SETS THE ID OF FORM DATA FROM PROPS
    data["id"] = props.id;
    updateStudent(data);
  };

  // UPDATE THE STUDENTS ARRAY WITH CURRENT FORM DATA
  const updateStudent = (data) => {
    axios.put("http://localhost:3000/wizards", data).then((res) => {
      props.setStudents(
        props.students.map((item) => {
          return item.id === props.id ? {
            id: item.id,
            name: item.name,
            wand: item.wand,
            family: item.family,
          }
            : item;
        })
      );
    });
    // RESETS FORM DATA
    reset({ name: null, wand: null })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="edit">
      <div className="formControl">
        <label htmlFor="name">Name:</label>
        <input {...register('name')} type="text" name="name" id="name" required />
      </div>
      <div className="formControl">
        <label htmlFor="wand">Wand:</label>
        <input {...register('wand')} type="text" name="wand" id="wand" required />
      </div>
      <div className="formControl">
        <input type="submit" value="Edit" />
      </div>
    </form>
  )
}