import React, { useRef, useEffect } from 'react';
import {
  validateInput,
  setInvalid,
  parseConstraints,
} from '../../../validation';
import { isDisabled } from '../../../extended-element';
import { EVENT_TYPES } from '../../../attributes';
import {
  baseInputPropTypes,
  baseInputDefaultProps,
} from './base-input.proptypes';

const BaseInput = ({
  autoComplete,
  dataType,
  descriptionId,
  disabled,
  errorMessageId,
  id,
  invalid,
  labelId,
  name,
  placeholder,
  showValidationOn,
  spellCheck,
  type,
  validation,
}) => {
  const [constraints, validationMessages] = parseConstraints(validation) ?? [
    null,
    null,
  ];

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current['errors'] = validationMessages;
  }, []);

  function onInvalid({ target }) {
    setInvalid(target);
  }

  function onBlur({ target }) {
    if (showValidationOn !== EVENT_TYPES.BLUR) return;
    // this isn't the best idea but if a user clicks
    // the submit button while still focused on the input
    // the blur fires and prevents the button click
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

  return (
    <input
      aria-describedby={descriptionId}
      aria-disabled={disabled}
      aria-errormessage={errorMessageId}
      aria-invalid={invalid}
      aria-labelledby={labelId}
      autoComplete={autoComplete}
      className="input-group__input"
      data-showvalidation={showValidationOn}
      id={id}
      name={name ?? id}
      onInput={onInput}
      onBlur={onBlur}
      onInvalid={onInvalid}
      placeholder={placeholder}
      readOnly={disabled}
      ref={textInput}
      spellCheck={spellCheck}
      type={type}
      {...dataType}
      {...constraints}
    />
  );
};

BaseInput.propTypes = baseInputPropTypes;
BaseInput.defaultProps = baseInputDefaultProps;

export default BaseInput;
