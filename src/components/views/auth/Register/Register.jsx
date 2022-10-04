//Libraries
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { Switch, FormControlLabel } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
//Schema
import { registerFormSchema } from "./registerFormSchema";
//Styles
import "../Auth.styles.css";
//Environment variable
const { REACT_APP_API_ENDPOINT } = process.env;

export const Register = () => {
  //States
  const [isVisible, setIsVisible] = useState(true);
  const [selectOptions, setSelectOptions] = useState();

  const navigate = useNavigate();
  //Event Handlers
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      teamExists: false, //Team already exists
      teamID: "",
      role: "", // ==> ["Team Member","Team Leader"]
      continent: "", // ==> ["America","Europa","Otro"]
      region: "", // ==> ["Otro","Latam","Brasil","America del Norte"]
    },
    validationSchema: registerFormSchema,

    onSubmit: (values) => {
      const teamID = values.teamExists ? values.teamID : uuidv4();
      const { userName, password, email, role, continent, region } = values;
      fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            userName,
            password,
            email,
            teamID,
            role,
            continent,
            region,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/registered/" + data?.result.user?.teamID, {
            replace: true,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });
  const handleChangeContinent = (event) => {
    const selectedContinent = event.target.value;
    setFieldValue("continent", selectedContinent);
    if (selectedContinent && selectedContinent !== "America")
      setFieldValue("region", "Otro");
  };
  //Side Effects
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
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

              <FormControlLabel
                control={
                  <Switch
                    name="teamExists"
                    color="warning"
                    onChange={() => {
                      setFieldValue("teamExists", !values.teamExists);
                    }}
                    checked={values.teamExists}
                    value={values.teamExists}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Perteneces a un equipo ya creado"
              />
              {values.teamExists && (
                <div className="form_input_group">
                  <label htmlFor="teamID">
                    Por favor introduce el identificador de equipo
                  </label>
                  <input
                    type="text"
                    name="teamID"
                    value={values.teamID}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              )}
              {errors.teamID && touched.teamID && (
                <span className="form_error_msg">{errors.teamID}</span>
              )}
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
                  onChange={(event) => handleChangeContinent(event)}
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
