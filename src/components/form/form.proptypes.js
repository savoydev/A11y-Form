import { node, string, oneOf } from 'prop-types';
import { EVENT_TYPES } from '../../attributes';

export const formPropTypes = {
  children: node,
  name: string,
  showValidationOn: oneOf(Object.values(EVENT_TYPES)),
};
