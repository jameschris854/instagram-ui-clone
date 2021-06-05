import React from 'react';

import './Button.styles.scss'

export const Button = ({buttonStyle,status,buttonText,handleClick}) => {
    return(
    <button className={`${buttonStyle==='loginAndSignup'?'loginAndSignup':''} ${status?'active':''}`} onClick={handleClick}>{buttonText}</button>
)}