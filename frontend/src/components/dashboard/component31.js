import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard'
import '../../stylesheets/dashboardcomponents/component31.css'


// not in use
 
function Component31(props) {

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
    
    <div >
      <header>
        <h3>List of Component31</h3>
      </header>

      <section> 
      {forLoop()}
      </section>

    </div>
  );

}

export default Component31;