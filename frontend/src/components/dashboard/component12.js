import React, { useState, useEffect } from 'react';
import '../../pages/Dashboard'
import FetchAPI12 from '../../hooks/FetchAPI12';

function Component12(props) {

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
    
    <div className="placeholder">
      <header>
        <h3>Requests Sent</h3>
      </header>

      <section> 
      {forLoop()}
      </section>

      <section>
      <FetchAPI12/>
      </section>

    </div>
  );

}

export default Component12;