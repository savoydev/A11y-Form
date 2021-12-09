import React from 'react';

const InputDescription = ({ children, id }) => {
  return (
    <p className="description" id={id}>
      {children}
    </p>
  );
};

export default InputDescription;
