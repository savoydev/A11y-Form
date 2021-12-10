import React from 'react';

const InputDescription = ({ children, id }) => {
  return (
    <p className="input-group__description" id={id}>
      {children}
    </p>
  );
};

export default InputDescription;
