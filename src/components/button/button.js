import React from 'react';

const Button = (props) => {
  const { children, ...other } = props;
  return (
    <button className="form__button" {...other}>
      {children}
    </button>
  );
};

export default Button;
