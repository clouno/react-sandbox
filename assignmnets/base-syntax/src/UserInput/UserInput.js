import React from 'react';

const UserInput = (props) => {
    const style = {
        margin: '5px',
        padding: '5px',
        border: '2px solid red'
    }
    return (
        <input type="text" style={style} onChange={props.change} value={props.value} />
    );
}

export default UserInput