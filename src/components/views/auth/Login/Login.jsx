//Libraries
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
//Components
import { swal } from "../../../../utils/swal";
//Styles
import "../Auth.styles.css";
//Schemas
import { loginFormSchema } from "./loginFormSchema";

//Environment variable
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Login = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  //Event Handlers
  //Formik form Handler (change and submit)
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: loginFormSchema,
      onSubmit: (values) => {
        const { userName, password } = values;
        fetch(`${API_ENDPOINT}auth/login`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status_code === 200) {
              sessionStorage.setItem("token", data?.result?.token);
              sessionStorage.setItem("userName", data?.result?.user.userName);
              setIsVisible(false);
              navigate("/", { replace: true });
            } else {
              swal();
            }
          });
      },
    });

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
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
              <div className="form_input_group">
                <label htmlFor="email">Nombre de Usuario</label>
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
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
                  onBlur={handleBlur}
                  value={values.password}
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

              <button
                type="submit"
                disabled={Object.keys(errors).length === 0 ? false : true}
              >
                Enviar
              </button>
              <Link to={"/register"} onClick={() => setIsVisible(false)}>
                Registrarme
              </Link>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
