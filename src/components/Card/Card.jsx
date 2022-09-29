//utils
const limitString = (str) => {
  const maxChar = 128;
  if (str.length > maxChar) {
    return str.slice(0, maxChar - 3).concat("...");
  }
  return str;
};
export const Card = ({ data }) => {
  return (
    <div className="card">
      <div className="close">x</div>
      <h3>{data.title}</h3>
      <h6>{data.date}</h6>
      <h5>{data.creator}</h5>
      <button type="button">{data.status}</button>
      <button type="button">{data.priority}</button>
      <p>{limitString(data.description)}</p>
    </div>
  );
};
