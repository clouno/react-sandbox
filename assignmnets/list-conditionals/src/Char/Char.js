import React from 'react'
import classes from './Char.module.css'

const char = (props) => <span className={classes.Char} onClick={props.click}>{props.char}</span>;

export default char;