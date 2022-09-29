//Imports
/* ---------------------------------------------------- */
//Hooks
import { useResize } from "../../../hooks/useResize";
//Components
import { Header } from "../../Header/Header";
import { Card } from "../../Card/Card";
import { TaskForm } from "../../TaskForm/TaskForm";
//Styles
import "./Tasks.styles.css";
//data
import { cardsData } from "./data";
/* ----------------------------------------------------- */

export const Tasks = () => {
  const isMobile = useResize();
  const renderAllCards = () => {
    return cardsData.map((task) => <Card key={task.id} data={task} />);
  };
  return (
    <>
      <Header />

      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <h2 className="list_header">Mis Tareas</h2>

          {!isMobile && (
            <div className="list_group">
              <div className="list">{renderAllCards()}</div>
            </div>
          )}
          {isMobile && <div className="list mobile">{renderAllCards()}</div>}
        </section>
      </main>
    </>
  );
};
