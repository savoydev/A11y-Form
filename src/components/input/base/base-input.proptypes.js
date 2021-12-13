import { string, bool, oneOf, shape, number } from 'prop-types';
import { EVENT_TYPES, INPUT_TYPES, AUTOCOMPLETE } from '../../../attributes';

const numberConstraint = shape({
  value: number.isRequired,
  message: string,
});

const boolConstraint = shape({
  value: bool.isRequired,
  message: string,
});

export const constraintValidationType = shape({
  minlength: numberConstraint,
  maxlength: numberConstraint,
  required: boolConstraint,
});

export const baseInputPropTypes = {
  autoComplete: oneOf(Object.values(AUTOCOMPLETE)),
  dataType: string,
  descriptionId: string,
  disabled: bool,
  errorMessageId: string,
  id: string.isRequired,
  invalid: bool,
  labelId: string.isRequired,
  name: string,
  placeholder: string,
  showValidationOn: oneOf(Object.values(EVENT_TYPES)),
  spellCheck: bool,
  type: oneOf(Object.values(INPUT_TYPES)),
  validation: constraintValidationType,
};

export const baseInputDefaultProps = {
  autoComplete: AUTOCOMPLETE.OFF,
  showValidationOn: EVENT_TYPES.SUBMIT,
  spellCheck: false,
  type: INPUT_TYPES.TEXT,
};
