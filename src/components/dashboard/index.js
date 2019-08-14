import React from 'react';

function Dashbord(props) {
    let widget = props.profile.widget ? 'main-chrom-widget' : 'main-chrom';

    return (
        <div className={"main " + widget}>
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