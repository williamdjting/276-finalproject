import React, { useState, useEffect } from "react";
import "../../pages/Dashboard";
import FetchAPI21 from "../../hooks/FetchAPI21";

function Component21(props) {
  return (
    <div className="placeholder history-container">
      <h3>Transaction History</h3>
      <FetchAPI21 />
    </div>
  );
}

export default Component21;
