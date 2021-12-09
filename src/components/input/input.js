import React, { useRef, useEffect } from 'react';
import {
  ARIA_ATTR,
  INPUT_TYPES,
  validateInput,
  setInvalid,
  isDisabled
} from '../../validation';

const Input = ({
  invalid = false,
  required = false,
  disabled = false,
  labelId,
  labelText,
  id,
  placeholder,
  name,
  type = INPUT_TYPES.TEXT,
  errorMessage,
  description,
  minLength,
  maxLength,
  dataType,
  autoComplete = 'off',
  spellCheck = false,
}) => {
  const ariaErrorMessageId = `${id}ErrorMsg`;
  const ariaDescribedById = description != null ? `${id}DescribedBy` : null;
  const computedLabelId = labelId ?? `${id}Label`;
  const textInput = useRef(null);

  // useEffect(() => {
  //   const validityState = textInput.current.validity;
  //   console.log('validitystate', validityState);
  //   if (validityState.valueMissing) {
  //     textInput.current.setCustomValidity('Missing value');
  //   } else {
  //     textInput.current.setCustomValidity('');
  //   }
  //   textInput.current.reportValidity();
  //   console.log('input loaded');
  // }, []);

  function onInvalid({ target }) {
    setInvalid(target);
  }

  function onBlur({ target }) {
    const buttonHover = document.querySelector('button[type="submit"]:hover');
    if (buttonHover) return;
    validateInput(target);
  }

  function onInput({ target, type }) {
    if(isDisabled) {
      target.value = '';
    }
    return;
  }

  console.log(disabled)
  return (
    <InputGroup inputId={id} invalid={invalid} required={required} disabled={disabled}>
      <Label id={computedLabelId} htmlFor={id} disabled={disabled}>
        {labelText}
      </Label>
      {description && (
        <InputDescription id={ariaDescribedById}>
          {description}
        </InputDescription>
      )}
      <InputError id={ariaErrorMessageId}>{errorMessage}</InputError>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        data-maxlength={maxLength}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        ref={textInput}
        aria-required={required}
        aria-invalid={invalid}
        aria-disabled={disabled}
        aria-labelledby={computedLabelId}
        aria-errormessage={ariaErrorMessageId}
        aria-describedby={ariaDescribedById}
        onInput={onInput}
        onBlur={onBlur}
        onInvalid={onInvalid}
        {...dataType}
      />
    </InputGroup>
  );
};

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

const Label = ({ id, disabled = false, children, htmlFor }) => {
  return (
    <label id={id} htmlFor={htmlFor} disabled={disabled}>
      {children}
    </label>
  );
};

const InputDescription = ({ children, id }) => {
  return (
    <span className="description" id={id}>
      {children}
    </span>
  );
};

const InputError = ({ children, id }) => {
  return (
    <span className="error-message" id={id}>
      {children}
    </span>
  );
};

Input.Label = Label;
Input.Description = InputDescription;
Input.Error = InputError;

export default Input;
