import { node, string, oneOfType } from 'prop-types';

export const inputErrorPropTypes = {
  id: string.isRequired,
  children: oneOfType([node, string]),
};
