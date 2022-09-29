//Libraries
import { useFormik } from "formik";
//Schema
import { taskFormSchema } from "./taskFormSchema";
//Styles
import "./TaskForm.styles.css";

export const TaskForm = () => {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        status: "",
        priority: "",
        description: "",
      },
      validationSchema: taskFormSchema,
      onSubmit: (values) => {
        alert();
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
              <option value="new">Nueva</option>
              <option value="inProcess">En Proceso</option>
              <option value="finished">Terminada</option>
            </select>
            {errors.status && touched.status && (
              <span className="form_error_msg">{errors.status}</span>
            )}
          </div>
          <div className="row">
            <select
              name="priority"
              onChange={handleChange}
              value={values.priority}
              onBlur={handleBlur}
              className={
                errors.priority && touched.priority ? "form_error_field" : ""
              }
            >
              <option value="">Seleccionar una prioridad</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            {errors.priority && touched.priority && (
              <span className="form_error_msg">{errors.priority}</span>
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
    </section>
  );
};
