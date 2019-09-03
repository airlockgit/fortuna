import React from 'react';

function Dashbord(props) {
    let widget = props.profile.widget ? 'main-chrom-widget' : 'main-chrom';

    return (
        <div className={"main " + widget}>
            <div className="dashboard">
                <header className="header">
                    {
                        props.profile.widget ? <h1>Фортуна</h1> : null
                    } 
                </header>
                {props.children}
            </div>
      </div>
    );
  }

  export default Dashbord;