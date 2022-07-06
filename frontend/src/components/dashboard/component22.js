import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard'
import '../../stylesheets/dashboardcomponents/component22.css'
import FetchAPI22 from '../../hooks/FetchAPI22';

function Component22(props) {

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
    
    <div id="placeholder22" >
      <header>
        <h3>Recent Contact</h3>
      </header>

      <section> 
      {forLoop()}
      </section>

      <section>
      <FetchAPI22/>
      </section>

    </div>
  );

}

export default Component22;