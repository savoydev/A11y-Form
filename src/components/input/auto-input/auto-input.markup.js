import React from 'react';
import { InputGroup } from '../';
import { autoInputPropTypes } from './auto-input.proptypes';
import { autoInputDescision } from './auto-input.class';

let group = {
  invalid: '',
  inputId: '',
  required: '',
  disable: '',
};

let label = {
  id: '',
  disabled: '',
  children: '',
  htmlFor: '',
};

let description = {
  id: '',
  children: '',
};

let error = {
  id: '',
  children: '',
};

let input = {
  invalid: '',
  required: '',
  disabled: '',
  labelid: '',
  id: '',
  placeholder: '',
  name: '',
  type: '',
  description: '',
  minlength: '',
  maxlength: '',
  datatype: '',
  autocomplete: '',
  spellcheck: '',
};

// Can specify label, description, input, error using object
// or those can be autogenerated based on other props
const AutoInput = ({
  id,
  required = false,
  group,
  label,
  description,
  error,
  input,
  labelText,
  validation,
  showValidationOn,
}) => {
  const autoObj = autoInputDescision(input, id);
  autoObj.label(label, labelText);
  autoObj.errorMessageId(error);
  autoObj.groupId(group);
  autoObj.required(required);
  autoObj.descriptionId(description);

  return (
    <InputGroup required={autoObj.required} inputId={autoObj.inputId}>
      <InputGroup.Label id={autoObj.labelId} htmlFor={autoObj.labelFor}>
        {autoObj.labelText}
      </InputGroup.Label>
      {description && (
        <InputGroup.Description id={autoObj.descriptionId}>
          {description.text}
          {description.children}
        </InputGroup.Description>
      )}
      <InputGroup.Error id={autoObj.errorMessageId} />
      <InputGroup.Input
        descriptionId={autoObj.descriptionId}
        errorMessageId={autoObj.errorMessageId}
        id={autoObj.inputId}
        labelId={autoObj.labelId}
        name={autoObj.name}
        required={autoObj.required}
        showValidationOn={showValidationOn}
        validation={validation}
      />
    </InputGroup>
  );
};

AutoInput.propTypes = autoInputPropTypes;
export default AutoInput;
