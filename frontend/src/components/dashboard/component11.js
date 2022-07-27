import React, { useState, useEffect } from "react";
import "../../pages/Dashboard";

import FetchAPI11 from "../../hooks/FetchAPI11";

function Component11(props) {
  return (
    <div className="placeholder info">
      <h3>Total Outstanding Balance</h3>

        <FetchAPI11 />

    </div>
  );
}

export default Component11;
