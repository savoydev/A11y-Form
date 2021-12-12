import React from 'react';
import {inputErrorPropTypes} from './proptypes'

const InputError = ({ children, id }) => {
  return (
    <span className="input-group__error-message" id={id}>
      {children}
    </span>
  );
};

InputError.propTypes = inputErrorPropTypes;
export default InputError;
