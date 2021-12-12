import { string, bool, shape, number } from 'prop-types';

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
