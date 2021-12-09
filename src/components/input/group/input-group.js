import React from 'react';
import InputLabel from '../label/input-label';
import InputDescription from '../description/input-description';
import InputError from '../error/input-error';
import BaseInput from '../base/base-input.js'

const InputGroup = ({ children, invalid, inputId, required, disabled }) => {

  return (
    <div
      className="input-group"
      data-invalid={invalid}
      data-input-id={inputId}
      data-required={required}
      data-disabled={disabled}
    >
      {children}
    </div>
  );
};

InputGroup.Label = InputLabel;
InputGroup.Description = InputDescription;
InputGroup.Error = InputError
InputGroup.Input = BaseInput;
export default InputGroup;
