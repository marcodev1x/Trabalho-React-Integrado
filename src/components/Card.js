import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ id, title, description, imageUrl }) => {
  return (
    <Link to={`/details/${id}`} className="card">
      <img src={imageUrl} alt={title} />
      <div className="card-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Card;
