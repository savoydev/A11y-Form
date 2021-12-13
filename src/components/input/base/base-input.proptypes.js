import { string, bool, oneOf, number, exact } from 'prop-types';
import { EVENT_TYPES, INPUT_TYPES, AUTOCOMPLETE } from '../../../attributes';

const numberConstraint = exact({
  value: number.isRequired,
  message: string,
});

const boolConstraint = exact({
  value: bool.isRequired,
  message: string,
});

export const constraintValidationTypes = exact({
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
  validation: constraintValidationTypes,
};

export const baseInputDefaultProps = {
  autoComplete: AUTOCOMPLETE.OFF,
  showValidationOn: EVENT_TYPES.SUBMIT,
  spellCheck: false,
  type: INPUT_TYPES.TEXT,
};
