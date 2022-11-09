import "./card.css";

const Card = ({ cardtit, url }) => {
  return (
    <div className="card" style={{ backgroundImage: `url(${url})` }}>
      <h2 className="tit">{cardtit}</h2>
    </div>
  );
};

export default Card;
