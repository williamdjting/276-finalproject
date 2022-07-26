import React, { useState, useEffect } from "react";
import "../../pages/Dashboard";
import FetchAPI21 from "../../hooks/FetchAPI21";

function Component21(props) {
  const forLoop = () => {
    const localArr = [];
    for (let i = 0; i < props.names.length; i++) {
      localArr.push(<div key={i}>{props.names[i]}</div>);
    }
    return <div>{localArr}</div>;
  };

  return (
    <div className="placeholder history-container">
      <h3>Transaction History</h3>

      <section>{forLoop()}</section>

      <FetchAPI21 />
    </div>
  );
}

export default Component21;
