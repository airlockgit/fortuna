import React from 'react';

export const Dashbord = ({ children, title = false }) => {
    return (
        <div className={"main"}>
            <div className="dashboard">
                {
                    title ? <h2>Фортуна</h2> : null
                }
                {children}
            </div>
        </div>
    );
}