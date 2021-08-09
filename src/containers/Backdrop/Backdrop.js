import React from 'react';
import './Backdrop.css';

const backdrop = (props) => {
    return ( 
        props.show?
        <div
        className="Backdrop"
        onClick={props.backDropClickHandler}
        >
            
        </div>:null
     );
}
 
export default backdrop;