import React, { useRef, useEffect } from 'react';
import {
  ARIA_ATTR,
  AUTO_SUFFIX,
  INPUT_TYPES,
  validateInput,
  setInvalid,
  isDisabled,
  EVENT_TYPES,
} from '../../../validation';

const Input = ({
  invalid = null,
  required = null,
  disabled = null,
  labelId,
  id,
  placeholder,
  name,
  type = INPUT_TYPES.TEXT,
  description,
  minLength,
  maxLength,
  dataType,
  autoComplete = 'off',
  spellCheck = false,
  errorMessageId,
  validation = null,
  showValidationOn = EVENT_TYPES.SUBMIT,
}) => {
  const ariaDescribedById = description != null ? `${id}DescribedBy` : null;
  const computedLabelId = labelId ?? `${id}${AUTO_SUFFIX.LABEL}`;
  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.errors = errorMessageObj;
  }, []);
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
    if (showValidationOn !== EVENT_TYPES.BLUR) return;
    // this isn't the best idea ..
    const buttonHover = document.querySelector('button[type="submit"]:hover');
    if (buttonHover) return;
    validateInput(target);
  }

  function onInput({ target }) {
    if (isDisabled(target)) {
      target.value = '';
    }
    if (showValidationOn !== EVENT_TYPES.INPUT) return;
    // TODO: better timing for validation on input
    // timing/character count based on validation type?
    // if (target.value.length % 2 === 0)
    validateInput(target);
  }

  let validateObj = {};
  let errorMessageObj = {};
  function validationObject(validation) {
    if (validation == null) return;
    validation.forEach((validate) => {
      validateObj[`${validate.property}`] = validate.value;
      errorMessageObj[`${validate.property}`] = validate.message;
    });
  }

  validationObject(validation);
  return (
    <input
      className="input-group__input"
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      data-minlength={minLength}
      data-maxlength={maxLength}
      data-showvalidation={showValidationOn}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      ref={textInput}
      // aria-required={required}
      aria-invalid={invalid}
      aria-disabled={disabled}
      aria-labelledby={computedLabelId}
      aria-errormessage={errorMessageId}
      aria-describedby={ariaDescribedById}
      onInput={onInput}
      onBlur={onBlur}
      onInvalid={onInvalid}
      {...dataType}
      {...validateObj}
      readOnly={disabled}
    />
  );
};

export default Input;
