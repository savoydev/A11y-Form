import { string, oneOfType, bool, node } from 'prop-types';

export const inputLabelPropTypes = {
  children: oneOfType([node, string]).isRequired,
  disabled: bool,
  htmlFor: string.isRequired,
  id: string.isRequired,
};

export const inputLabelDefaultProps = {
  disabled: false,
};
