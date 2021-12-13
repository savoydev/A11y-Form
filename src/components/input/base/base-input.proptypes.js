import { string, bool, oneOf } from 'prop-types';
import { EVENT_TYPES, INPUT_TYPES, ATTR_BOOL } from '../../../validation';
import { constraintValidationType } from '../../../types/index';

export const baseInputPropTypes = {
  autoComplete: oneOf([ATTR_BOOL.ON, ATTR_BOOL.OFF]),
  dataType: string,
  descriptionId: string,
  disabled: bool,
  errorMessageId: string,
  id: string.isRequired,
  invalid: bool,
  labelId: string.isRequired,
  name: string,
  placeholder: string,
  showValidationOn: oneOf([
    EVENT_TYPES.SUBMIT,
    EVENT_TYPES.BLUR,
    EVENT_TYPES.INPUT,
  ]),
  spellCheck: bool,
  type: oneOf([INPUT_TYPES.TEXT, INPUT_TYPES.EMAIL, INPUT_TYPES.NUMBER]),
  validation: constraintValidationType,
};

export const baseInputDefaultProps = {
  autoComplete: 'off',
  showValidationOn: EVENT_TYPES.SUBMIT,
  spellCheck: false,
  type: INPUT_TYPES.TEXT,
};
