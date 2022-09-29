//Libraries
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
//Schema
import { registerFormSchema } from "./registerFormSchema";
//Styles
import "../Auth.styles.css";

export const Register = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectOptions, setSelectOptions] = useState();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
        email: "",
        teamID: "",
        role: "", // ==> ["Team Member","Team Leader"]
        continent: "", // ==> ["America","Europa","Otro"]
        region: "", // ==> ["Otro","Latam","Brasil","America del Norte"]
      },
      validationSchema: registerFormSchema,
      onSubmit: (values) => {
        alert();
      },
    });
  useEffect(() => {
    fetch("https://goscrum-api.alkemy.org/auth/data")
      .then((res) => res.json())
      .then((data) => setSelectOptions(data.result));
  }, []);
  return (
    isVisible && (
      <AnimatePresence>
        <motion.div
          className="auth_container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="auth_card">
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
              <div className="form_input_group">
                <label htmlFor="userName">Nombre de Usuario</label>
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  value={values.userName}
                  onBlur={handleBlur}
                  className={
                    errors.userName && touched.userName
                      ? "form_error_field"
                      : ""
                  }
                />
                {errors.userName && touched.userName && (
                  <span className="form_error_msg">{errors.userName}</span>
                )}
              </div>
              <div className="form_input_group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "form_error_field"
                      : ""
                  }
                />
                {errors.password && touched.password && (
                  <span className="form_error_msg">{errors.password}</span>
                )}
              </div>
              <div className="form_input_group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "form_error_field" : ""
                  }
                />
                {errors.email && touched.email && (
                  <span className="form_error_msg">{errors.email}</span>
                )}
              </div>
              <input
                type="hidden"
                name="teamID"
                value="3245-90234234-23489234"
              />
              <div className="form_input_group">
                <label htmlFor="role">Rol</label>
                <select
                  name="role"
                  onChange={handleChange}
                  value={values.role}
                  onBlur={handleBlur}
                  className={
                    errors.role && touched.role ? "form_error_field" : ""
                  }
                >
                  <option value="">Seleccionar un rol</option>
                  {selectOptions &&
                    selectOptions.Rol &&
                    selectOptions.Rol.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                </select>
                {errors.role && touched.role && (
                  <span className="form_error_msg">{errors.role}</span>
                )}
              </div>

              <div className="form_input_group">
                <label htmlFor="continent">Continente</label>
                <select
                  name="continent"
                  onChange={handleChange}
                  value={values.continent}
                  onBlur={handleBlur}
                  className={
                    errors.continent && touched.continent
                      ? "form_error_field"
                      : ""
                  }
                >
                  <option value="">Seleccionar un continente</option>
                  {selectOptions &&
                    selectOptions.continente &&
                    selectOptions.continente.map((continent, index) => (
                      <option key={index} value={continent}>
                        {continent}
                      </option>
                    ))}
                </select>
                {errors.continent && touched.continent && (
                  <span className="form_error_msg">{errors.continent}</span>
                )}
              </div>

              {values.continent === "America" && (
                <div className="form_input_group">
                  <label htmlFor="region">Región</label>
                  <select
                    name="region"
                    onChange={handleChange}
                    value={values.region}
                    onBlur={handleBlur}
                    className={
                      errors.region && touched.region ? "form_error_field" : ""
                    }
                  >
                    <option value="">Seleccionar un a región</option>
                    {selectOptions &&
                      selectOptions.region &&
                      selectOptions.region.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                  </select>
                  {errors.region && touched.region && (
                    <span className="form_error_msg">{errors.region}</span>
                  )}
                </div>
              )}

              <button type="submit">Enviar</button>
              <div>
                <p>Ya tienes cuenta?</p>
                <p>
                  <Link to={"/login"} onClick={() => setIsVisible(false)}>
                    Ingresar
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
