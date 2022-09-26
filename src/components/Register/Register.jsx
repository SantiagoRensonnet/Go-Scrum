import "./Register.styles.css";
import { useFormik } from "formik";

export const Register = () => {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      teamID: "",
      role: "", // ==> ["Team Member","Team Leader"]
      continent: "", // ==> ["America","Europa","Otro"]
      region: "", // ==> ["Otro","Latam","Brasil","America del Norte"]
    },

    onSubmit: (values) => {
      alert();
    },
  });
  return (
    <div className="Login">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-input-group">
          <label htmlFor="userName">Nombre de Usuario</label>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            value={values.userName}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="role">Rol</label>
          <select name="role" onChange={handleChange} value={values.role}>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
        </div>
        <div className="form-input-group">
          <label htmlFor="continent">Continente</label>
          <select
            name="continent"
            onChange={handleChange}
            value={values.continent}
          >
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-input-group">
          <label htmlFor="region">Región</label>
          <select name="region" onChange={handleChange} value={values.region}>
            <option value="America del Norte">America del Norte</option>
            <option value="Brasil">Brasil</option>
            <option value="LATAM">LATAM</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
