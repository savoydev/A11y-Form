import { node, string, oneOf } from 'prop-types';
import { EVENT_TYPES } from '../../validation';

export const formPropTypes = {
  children: node,
  name: string,
  showValidationOn: oneOf([
    EVENT_TYPES.SUBMIT,
    EVENT_TYPES.INPUT,
    EVENT_TYPES.BLUR,
  ]),
};
