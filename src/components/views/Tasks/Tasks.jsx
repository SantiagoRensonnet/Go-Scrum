//Imports
/* ---------------------------------------------------- */
//Libraries
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
//Hooks
import { useResize } from "../../../hooks/useResize";
//Components
import { Header } from "../../Header/Header";
import { Card } from "../../Card/Card";
import { TaskForm } from "../../TaskForm/TaskForm";
//Styles
import "react-loading-skeleton/dist/skeleton.css";
import "./Tasks.styles.css";

/* ----------------------------------------------------- */

//Environment variable
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export const Tasks = () => {
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useResize();
  const renderAllCards = () => {
    return taskData?.map((task) => (
      <Card
        key={task._id}
        title={task.title}
        date={task.createdAt}
        creator={task.user.userName}
        status={task.status}
        importance={task.importance}
        description={task.description}
      />
    ));
  };
  const renderNewCards = () => {
    return taskData
      ?.filter((task) => task.status === "NEW")
      .map((task) => (
        <Card
          key={task._id}
          title={task.title}
          date={task.createdAt}
          creator={task.user.userName}
          status={task.status}
          importance={task.importance}
          description={task.description}
        />
      ));
  };
  const renderInProgressCards = () => {
    return taskData
      ?.filter((task) => task.status === "IN PROGRESS")
      .map((task) => (
        <Card
          key={task._id}
          title={task.title}
          date={task.createdAt}
          creator={task.user.userName}
          status={task.status}
          importance={task.importance}
          description={task.description}
        />
      ));
  };
  const renderFinishedCards = () => {
    return taskData
      ?.filter((task) => task.status === "FINISHED")
      .map((task) => (
        <Card
          key={task._id}
          title={task.title}
          date={task.createdAt}
          creator={task.user.userName}
          status={task.status}
          importance={task.importance}
          description={task.description}
        />
      ));
  };
  useEffect(() => {
    setLoading(true);
    fetch(`${API_ENDPOINT}task`, {
      method: "GET", // or 'PUT'
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTaskData(data.result);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <h2 className="list_header">Mis Tareas</h2>
          {taskData && taskData.length === 0 ? (
            <div>No hay tareas creadas</div>
          ) : (
            <>
              {!isMobile && (
                <div className="list_group">
                  <div className="list">
                    <h4>Nuevas</h4>
                    {loading ? <Skeleton /> : renderNewCards()}
                  </div>
                  <div className="list">
                    <h4>En Progreso</h4>
                    {loading ? <Skeleton /> : renderInProgressCards()}
                  </div>
                  <div className="list">
                    <h4>Completadas</h4>
                    {loading ? <Skeleton /> : renderFinishedCards()}
                  </div>
                </div>
              )}
              {isMobile &&
                (loading ? (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                ) : (
                  <div className="list mobile">{renderAllCards()}</div>
                ))}
            </>
          )}
        </section>
      </main>
    </>
  );
};
