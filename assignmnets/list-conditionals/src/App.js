import React, {useState} from 'react';
import './App.css';

import Validation from './Validation/Validation'
import Char from './Char/Char'

function App() {

    const [text, updateText] = useState("placeholder");

    const charClickHandler = (charIndex) => {
        const textAsArray = text.split('')
        textAsArray.splice(charIndex, 1);
        updateText(textAsArray.join(''));
    }

    const chars = text.split('').map((c, index) => {
        return <Char char={c} click={() => charClickHandler(index)} key={index} />;
    });

    return (
        <div className="App">
            <input onChange={(e) => updateText(e.target.value)} value={text}/>
            <p>{text.length}</p>
            <Validation textLength={text.length}/>
            <p>
                {chars}
            </p>
        </div>
    );
}

export default App;
