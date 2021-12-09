import React from 'react';
import InputLabel from '../label/input-label';
import InputDescription from '../description/input-description';
import BaseInput from '../base/base-input.js'

const AutoLabel = children => {

}

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
InputGroup.Input = BaseInput;
export default InputGroup;
