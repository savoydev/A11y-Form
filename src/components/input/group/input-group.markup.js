import React from 'react';
import { InputDescription, InputError, BaseInput } from '../index.js';
import InputLabel from '../label/input-label';
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

InputGroup.Label = InputLabel;
InputGroup.Description = InputDescription;
InputGroup.Error = InputError;
InputGroup.Input = BaseInput;

InputGroup.propTypes = inputGroupPropTypes;
export default InputGroup;
