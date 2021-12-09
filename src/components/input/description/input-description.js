import React from 'react';

const InputDescription = ({ children, id }) => {
  return (
    <span className="description" id={id}>
      {children}
    </span>
  );
};

export default InputDescription;
