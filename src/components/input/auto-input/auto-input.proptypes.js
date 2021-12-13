import { string, bool, oneOf, shape, node } from 'prop-types';
import { EVENT_TYPES } from '../../../attributes';
import { constraintValidationType } from '../../../types/index';

export const autoInputPropTypes = {
  id: string.isRequired,
  description: shape({
    children: node,
    id: string,
    text: string,
  }),
  error: shape({
    id: string.isRequired,
  }),
  group: shape({
    inputId: string,
  }),
  input: shape({
    id: string,
    name: string,
    required: bool,
  }),
  label: shape({
    id: string,
    for: string,
    text: string,
  }),
  labelText: string,
  required: bool,
  showValidationOn: oneOf(Object.values(EVENT_TYPES)),
  validation: constraintValidationType,
};
