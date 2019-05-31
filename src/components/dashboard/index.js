import React from 'react';

function Dashbord(props) {
    return (
        <div className="main main-chrom">
            <div className="dashboard">
                <header className="header">
                    <h1>Фортуна</h1> 
                </header>
                {props.children}
            </div>
      </div>
    );
  }

  export default Dashbord;