import React from 'react';

const validation = (props) => {
    let validationResult;
    
    if (props.textLength < 5) {
        validationResult = "Text too short";
    } else {
        validationResult = "Text long enough";
    }

    return <p>{validationResult}</p>;
}

export default validation;