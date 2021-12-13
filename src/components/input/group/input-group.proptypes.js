import { bool, string, node } from 'prop-types';

export const inputGroupPropTypes = {
  children: node.isRequired,
  disabled: bool,
  inputId: string.isRequired,
  invalid: bool,
  required: bool,
};
