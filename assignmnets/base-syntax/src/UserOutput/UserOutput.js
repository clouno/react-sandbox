import React from 'react';
import './UserOutput.css'

const UserOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>User profile</p>
            <p>Name: {props.username}</p>
        </div>
    );
}

export default UserOutput;