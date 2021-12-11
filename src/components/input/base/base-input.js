import React, { useRef, useEffect } from 'react';
import {
  ARIA_ATTR,
  AUTO_SUFFIX,
  INPUT_TYPES,
  validateInput,
  setInvalid,
  isDisabled,
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
}) => {
  const ariaDescribedById = description != null ? `${id}DescribedBy` : null;
  const computedLabelId = labelId ?? `${id}${AUTO_SUFFIX.LABEL}`;
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
    if (isDisabled(target)) {
      target.value = '';
    }
    return;
  }

  let validateObj = {};
  function validationObject(validation) {
    if (validation == null) return;
    validation.forEach((validate) => {
      console.log(validate.property);
      validateObj[`${validate.property}`] = validate.value;
    });

    console.log(validateObj);
  }

  validationObject(validation);

  return (
    <input
      className="input-group__input"
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
