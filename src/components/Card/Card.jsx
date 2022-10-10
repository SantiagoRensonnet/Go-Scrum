import { limitString } from "../../utils/limitString";
import "./Card.styles.css";
//Components
import CardModal from "./CardModal";

export const Card = (props) => {
  const { title, date, creator, status, importance, description } = props;
  return (
    <>
      <div className="card">
        <div className="close">x</div>
        <h3>{title}</h3>
        <h6>{date}</h6>
        <h5>{creator}</h5>
        <button type="button" className={status.toLowerCase()}>
          {status}
        </button>
        <button type="button" className={importance.toLowerCase()}>
          {importance}
        </button>
        <p>
          <>
            {limitString(description).limitedString}
            {limitString(description).state === "limited" && (
              <CardModal {...props} />
            )}
          </>
        </p>
      </div>
    </>
  );
};
