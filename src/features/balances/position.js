import React from 'react';

export const Position = (props) => {
    return (<div className="position">
        <span className="position-label">{props.currency}</span> 
        <span className="position-amount">{props.amount}</span>
    </div>);
};

