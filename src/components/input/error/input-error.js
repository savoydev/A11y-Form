import React from 'react';

const InputError = ({ children, id }) => {
  return (
    <span className="input-group__error-message" id={id}>
      {children}
    </span>
  );
};

export default InputError;
