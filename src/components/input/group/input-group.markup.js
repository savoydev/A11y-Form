import React from 'react';
import { Description, ValidationMessage, Label, BaseInput } from '../index.js';
import { inputGroupPropTypes } from './input-group.proptypes';

const InputGroup = ({ children, invalid, inputId, required, disabled }) => {
  return (
    <div
      className="form__input-group input-group"
      data-invalid={invalid}
      data-input-id={inputId}
      data-required={required}
      data-disabled={disabled}
    >
      {children}
    </div>
  );
};

InputGroup.Label = Label;
InputGroup.Description = Description;
InputGroup.Error = ValidationMessage;
InputGroup.Input = BaseInput;

InputGroup.propTypes = inputGroupPropTypes;
export default InputGroup;
