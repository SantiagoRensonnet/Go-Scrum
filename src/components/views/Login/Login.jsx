//Libraries
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
//Styles
import "./Login.styles.css";

export const Login = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  //Event Handlers
  //Formik form Handler (change and submit)
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
      console.log(errors);
      return errors;
    },
    onSubmit: (values) => {
      localStorage.setItem("logged", "yes");
      setIsVisible(false);
      navigate("/", { replace: true });
    },
  });

  return (
    isVisible && (
      <AnimatePresence>
        <motion.div
          className="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="login_card">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form_input_group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                {errors.email && (
                  <span className="form_error_msg">{errors.email}</span>
                )}
              </div>
              <div className="form_input_group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && (
                  <span className="form_error_msg">{errors.password}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={Object.keys(errors).length === 0 ? false : true}
              >
                Enviar
              </button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
};
