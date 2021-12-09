import React, { useRef, useEffect } from 'react';
import {
  ARIA_ATTR,
  INPUT_TYPES,
  validateInput,
  setInvalid,
  isDisabled
} from '../../validation';
import InputGroup from './group/input-group'
import InputDescription from './description/input-description'
import InputError from './error/input-error'
import InputLabel from './label/input-label'

const Input = ({
  invalid = null,
  required = null,
  disabled = null,
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
    if(isDisabled(target)) {
      target.value = '';
    }
    return;
  }

  return (
    <InputGroup inputId={id} invalid={invalid} required={required} disabled={disabled}>
      <InputLabel id={computedLabelId} htmlFor={id} disabled={disabled}>
        {labelText}
      </InputLabel>
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
        readOnly={disabled}
      />
    </InputGroup>
  );
};







Input.Label = InputLabel;
Input.Description = InputDescription;
Input.Error = InputError;

export default Input;
