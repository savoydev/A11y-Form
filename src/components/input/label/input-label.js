import React from 'react';

const InputLabel = ({ id, disabled = false, children, htmlFor, ...rest }) => {
  return (
    <label id={id} htmlFor={htmlFor} disabled={disabled}>
      {children}
    </label>
  );
};

export default InputLabel;
