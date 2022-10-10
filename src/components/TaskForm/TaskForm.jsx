//Libraries
import React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
//Schema
import { taskFormSchema } from "./taskFormSchema";
//Styles
import "./TaskForm.styles.css";

//Environment variable
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const TaskForm = () => {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      status: "",
      importance: "",
      description: "",
    },
    validationSchema: taskFormSchema,
    onSubmit: (values) => {
      fetch(`${API_ENDPOINT}task`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          task: values,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          resetForm();

          toast("tu tarea se creó");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <section className="task-form">
      <h2>Crear Tarea</h2>
      <p>Crea tus tareas </p>
      <form onSubmit={handleSubmit}>
        <section className="three-col">
          <div className="row">
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={values.title}
              onBlur={handleBlur}
              className={
                errors.title && touched.title ? "form_error_field" : ""
              }
            />
            {errors.title && touched.title && (
              <span className="form_error_msg">{errors.title}</span>
            )}
          </div>
          <div className="row">
            <select
              name="status"
              onChange={handleChange}
              value={values.status}
              onBlur={handleBlur}
              className={
                errors.status && touched.status ? "form_error_field" : ""
              }
            >
              <option value="">Seleccionar un estado</option>
              <option value="NEW">Nueva</option>
              <option value="IN PROGRESS">En Proceso</option>
              <option value="FINISHED">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="form_error_msg">{errors.status}</span>
            )}
          </div>
          <div className="row">
            <select
              name="importance"
              onChange={handleChange}
              value={values.importance}
              onBlur={handleBlur}
              className={
                errors.importance && touched.importance
                  ? "form_error_field"
                  : ""
              }
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className="form_error_msg">{errors.importance}</span>
            )}
          </div>
        </section>
        <section>
          <textarea
            name="description"
            cols="30"
            rows="10"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            className={
              errors.description && touched.description
                ? "form_error_field"
                : ""
            }
            placeholder="Descripción"
          ></textarea>
          {errors.description && touched.description && (
            <span className="form_error_msg">{errors.description}</span>
          )}
        </section>
        <button type="submit">Crear tarea</button>
      </form>
      <ToastContainer />
    </section>
  );
};
