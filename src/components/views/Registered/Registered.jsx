//Libraries
import { useParams } from "react-router-dom";
//Styles
import "./Registered.styles.css";
export const Registered = () => {
  let { userId } = useParams();
  return (
    <div className="container">
      <p>You were registered in team {userId}</p>
    </div>
  );
};
