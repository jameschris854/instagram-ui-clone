import React from "react";
import "./form-input.styles.scss";

const FormInput = ({handleChange,label,config, ...otherProps }) => (
  <div className={`group ${config? 'config':''}`}>
    <div className='label-side'>{config}</div>
    <input className={`form-input ${config? 'config':''}`} onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
