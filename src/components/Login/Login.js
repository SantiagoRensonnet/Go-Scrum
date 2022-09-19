import "./Login.css";
import { useFormik } from "formik";

export const Login = () => {
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      //...
      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: (values) => {
      localStorage.setItem("logged", "yes");
    },
  });
  return (
    <div className="Login">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && (
            <span className="form-error-msg">{errors.email}</span>
          )}
        </div>
        <div className="form-input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && (
            <span className="form-error-msg">{errors.password}</span>
          )}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
