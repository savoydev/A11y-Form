import { isRequired, node, oneOfType, string } from 'prop-types';

export const inputDescriptionPropTypes = {
  id: string.isRequired,
  children: oneOfType([string, node]),
};
