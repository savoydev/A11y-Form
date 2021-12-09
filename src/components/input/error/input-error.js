import React from 'react';

const InputError = ({ children, id }) => {
  return (
    <span className="error-message" id={id}>
      {children}
    </span>
  );
};

export default InputError;
