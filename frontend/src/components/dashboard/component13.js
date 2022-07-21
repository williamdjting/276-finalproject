import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard'
import '../../stylesheets/dashboardcomponents/component13.css'
import FetchAPI13 from '../../hooks/FetchAPI13';

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
        <h3>Outstanding Money Requests Received</h3>
      </header>

      <section> 
      {forLoop()}
      </section>

      <section>
      <FetchAPI13/>
      </section>

    </div>
  );

}

export default Component13;