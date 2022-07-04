import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard'
import '../../stylesheets/dashboardcomponents/component13.css'


function Component13(props) {

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
    
    <div id="placeholder13">
      <header>
        <h3>List of Component13</h3>
      </header>

      <section> 
      {forLoop()}
      </section>

    </div>
  );

}

export default Component13;