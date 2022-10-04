import { limitString } from "../../utils/limitString";
import "./Card.styles.css";
export const Card = ({
  title,
  date,
  creator,
  status,
  importance,
  description,
}) => {
  return (
    <div className="card">
      <div className="close">x</div>
      <h3>{title}</h3>
      <h6>{date}</h6>
      <h5>{creator}</h5>
      <button type="button">{status}</button>
      <button type="button">{importance}</button>
      <p>{limitString(description)}</p>
    </div>
  );
};
