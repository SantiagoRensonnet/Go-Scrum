//Imports
/* ---------------------------------------------------- */
//Libraries
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import debounce from "lodash.debounce";
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
  const [taskListData, seTaskListData] = useState(null);
  const [searchList, setSearchList] = useState(null);
  const [taskListByImportance, setTaskListByImportance] = useState(null);
  const [taskListRender, setTaskListRender] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showTasks, setShowTasks] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [importance, setImportance] = useState("");
  const isMobile = useResize();
  //Effects
  //Fetch
  useEffect(() => {
    setLoading(true);
    fetch(`${API_ENDPOINT}task`, {
      method: "GET", // or 'PUT'
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        seTaskListData(data.result);
        setSearchList(taskListData);
        setTaskListByImportance(searchList);
        setTaskListRender(taskListByImportance);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  //Filters
  useEffect(() => {
    if (showTasks === "ALL") setTaskListRender(taskListByImportance);
    else if (showTasks === "MINE")
      setTaskListRender(
        taskListByImportance.filter(
          (task) => task.user.userName === sessionStorage.getItem("userName")
        )
      );
  }, [taskListByImportance, showTasks]);
  useEffect(() => {
    if (searchList) {
      if (importance === "ALL") setTaskListByImportance(searchList);
      else
        setTaskListByImportance(
          searchList.filter((task) => task.importance === importance)
        );
    }
  }, [importance, searchList]);
  useEffect(() => {
    if (searchTerm)
      setSearchList(
        taskListData.filter((task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    else setSearchList(taskListData);
  }, [searchTerm, taskListData]);
  //Rendering Functions
  const renderAllCards = () => {
    return taskListRender?.map((task) => (
      <Card
        key={task._id}
        title={task.title}
        date={new Date(task.createdAt).toLocaleString()}
        creator={task.user.userName}
        status={task.status}
        importance={task.importance}
        description={task.description}
      />
    ));
  };
  const renderColumnCards = (status) => {
    return taskListRender
      ?.filter((task) => task.status === status)
      .map((task) => (
        <Card
          key={task._id}
          title={task.title}
          date={new Date(task.createdAt).toLocaleString()}
          creator={task.user.userName}
          status={task.status}
          importance={task.importance}
          description={task.description}
        />
      ));
  };

  const handleSearch = debounce((event) => {
    setSearchTerm(event.target.value);
  }, 1000);

  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <h2 className="list_header">Mis Tareas</h2>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={showTasks}
              onChange={(event) => {
                setShowTasks(event.target.value);
              }}
              row
              className="radio-buttons-group"
            >
              <FormControlLabel
                value="ALL"
                control={<Radio size="small" />}
                label="Todas"
              />
              <FormControlLabel
                value="MINE"
                control={<Radio size="small" />}
                label="Mis Tareas"
              />
            </RadioGroup>
          </FormControl>
          <input type="text" placeholder="search" onChange={handleSearch} />
          <select
            name="importance"
            onChange={(event) => {
              setImportance(event.target.value);
            }}
          >
            <option value="">Seleccione una prioridad</option>
            <option value="ALL">Todas</option>
            <option value="HIGH">Alta</option>
            <option value="MEDIUM">Media</option>
            <option value="LOW">Baja</option>
          </select>
          {taskListData && taskListData.length === 0 ? (
            <div>No hay tareas creadas</div>
          ) : (
            <>
              {!isMobile && (
                <div className="list_group">
                  <div className="list">
                    <h4>Nuevas</h4>
                    {loading ? <Skeleton /> : renderColumnCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En Progreso</h4>
                    {loading ? <Skeleton /> : renderColumnCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Completadas</h4>
                    {loading ? <Skeleton /> : renderColumnCards("FINISHED")}
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
