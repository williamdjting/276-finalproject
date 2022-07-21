import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard'
import '../../stylesheets/dashboardcomponents/component11.css'
import FetchAPI11 from '../../hooks/FetchAPI11';

function Component11(props) {

  const forLoop = () => {
    const localArr = [];
    for (let i = 0; i < props.names.length; i++) {
      localArr.push(
      <div key={i}>
        {props.names[i]}
        
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
    
    <div id="placeholder11">
      <header>
        <h3>Welcome User 33</h3>
      </header>

      <section> 
      {forLoop()}
      </section>

      <section>
      <h1>Your Total Outstanding Balance is:
      <FetchAPI11/></h1>
      </section>

    </div>
  );

}

export default Component11;