import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard'
import '../../stylesheets/dashboardcomponents/component21.css'
import FetchAPI21 from '../../hooks/FetchAPI21';

function Component21(props) {

  const forLoop = () => {
    const localArr = [];
    for (let i = 0; i < props.names.length; i++) {
      localArr.push(<div key={i}>{props.names[i]}
      </div>
      );

    }    
    return (
      <div>
      {localArr} 
      </div>
    )
  }


  return (
    
    <div id="placeholder21">
      <header>
        <h3>Transaction History</h3>
      </header>

      <section> 
      {forLoop()}
      </section>

      <section>
      <FetchAPI21/>
      </section>

    </div>
  );

}

export default Component21;