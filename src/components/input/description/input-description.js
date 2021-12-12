import React from 'react';
import { inputDescriptionPropTypes } from './proptypes';

const InputDescription = ({ children, id }) => {
  return (
    <p className="input-group__description" id={id}>
      {children}
    </p>
  );
};

InputDescription.propTypes = inputDescriptionPropTypes;
export default InputDescription;
