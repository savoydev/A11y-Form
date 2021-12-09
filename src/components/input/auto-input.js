import React from 'react';
import InputGroup from './group/input-group';

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

const AutoInput = ({
  id,
  required,
  group,
  label,
  description,
  error = null,
  input,
}) => {
  const inputId = input === null ? id : input.id ?? id;

  const buildLabelId = () => {
    return `${inputId}Label`;
  };

  const buildErrorMessageId = () => {
    const fallBackId = `${inputId}ErrorMsg`;
    return error === null ? fallBackId : error.id ?? fallBackId;
  };

  const groupId = group.inputId ?? inputId;
  const labelId = label.id ?? buildLabelId();
  const labelFor = label.for ?? inputId;
  const errorMessageId = buildErrorMessageId();
  return (
    <InputGroup required={input.required ?? required} inputId={groupId}>
      <InputGroup.Label id={labelId} htmlFor={labelFor}>
        {label.text}
      </InputGroup.Label>
      {description && (
        <InputGroup.Description>
          {description.text}
          {description.children}
        </InputGroup.Description>
      )}
      <InputGroup.Error id={errorMessageId} />
      <InputGroup.Input
        required={input.required ?? required}
        labelId={labelId}
        errorMessageId={errorMessageId}
        id={inputId}
        name={input.name ?? inputId}
      />
    </InputGroup>
  );
};

export default AutoInput;
