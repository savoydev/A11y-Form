import React from 'react';
import InputGroup from '../group/input-group';
import { AUTO_SUFFIX } from '../../../attributes';
import { autoInputPropTypes } from './auto-input.proptypes';

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
  const inputId = input?.id ?? id;
  const computedLabelId = `${inputId}${AUTO_SUFFIX.LABEL}`;
  const computedErrorMsgId = `${inputId}${AUTO_SUFFIX.ERROR_MSG}`;
  const computedDescriptionId = `${inputId}${AUTO_SUFFIX.DESCRIPTION}`;

  const buildLabelId = () => {
    return label?.id ?? computedLabelId;
  };

  const buildLabelFor = () => {
    return label?.for ?? inputId;
  };

  const buildLabelText = () => {
    return label?.text ?? labelText;
  };

  const buildErrorMessageId = () => {
    return error?.id ?? computedErrorMsgId;
  };

  const buildGroupId = () => {
    return group?.inputId ?? inputId;
  };

  const buildInputRequired = () => {
    return input?.required ?? required;
  };

  const buildInputName = () => {
    return input?.name ?? inputId;
  };

  const buildDescriptionId = () => {
    return description?.id ?? computedDescriptionId;
  };

  const descriptionId = buildDescriptionId();
  const errorMessageId = buildErrorMessageId();
  const groupId = buildGroupId();
  const inputName = buildInputName();
  const inputRequired = buildInputRequired();
  const labelId = buildLabelId();
  const labelFor = buildLabelFor();
  const labelTextValue = buildLabelText();

  return (
    <InputGroup required={inputRequired} inputId={groupId}>
      <InputGroup.Label id={labelId} htmlFor={labelFor}>
        {labelTextValue}
      </InputGroup.Label>
      {description && (
        <InputGroup.Description id={descriptionId}>
          {description.text}
          {description.children}
        </InputGroup.Description>
      )}
      <InputGroup.Error id={errorMessageId} />
      <InputGroup.Input
        descriptionId={descriptionId}
        errorMessageId={errorMessageId}
        id={inputId}
        labelId={labelId}
        name={inputName}
        required={inputRequired}
        showValidationOn={showValidationOn}
        validation={validation}
      />
    </InputGroup>
  );
};

AutoInput.propTypes = autoInputPropTypes;
export default AutoInput;
