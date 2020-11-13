import React, { useState } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

function App() {
    const [state, updateUsername] = useState({username:'Jack'})

    const handleUsernameChange = (event) => {
        updateUsername({ username: event.target.value })
    }

    return (
        <div className="App">
            <UserInput change={handleUsernameChange} value={state.username} />
            <UserOutput username={state.username} />
            <UserOutput username="Anna" />
            <UserOutput username="Peter" />
        </div>
    );
}

export default App;
