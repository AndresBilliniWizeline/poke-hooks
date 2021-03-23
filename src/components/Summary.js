import React from "react";

import "./Summary.css";

const Summary = (props) => {
  return (
    <div className="summary">
      <h1>{props.name}</h1>
      <img className="summary-image" src={props.image} alt={props.name} />
      <p>
        Height: <span className="summary-info-item">{props.height}</span>
      </p>
      <p>
        Weight: <span className="summary-info-item">{props.weight}</span>
      </p>
      <p>
        Type: <span className="summary-info-item">{props.type}</span>
      </p>
      <p>
        Moves count:{" "}
        <span className="summary-info-item">{props.movesCount}</span>
      </p>
    </div>
  );
};

export default Summary;
