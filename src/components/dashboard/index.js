import React from 'react';

export const Dashbord = ({ children, profile, title = false }) => {
    const { widget } = profile;
    let classes__widget = widget ? 'main-chrom-widget' : 'main-chrom';

    return (
        <div className={"main " + classes__widget}>
            <div className="dashboard">
                {
                    title ? <h2>Фортуна</h2> : null
                }
                {children}
            </div>
        </div>
    );
}