import { shape, string, arrayOf } from 'prop-types';

export const formErrorSummaryPropTypes = {
  errors: arrayOf(
    shape({
      id: string.isRequired,
      validationMessage: string.isRequired,
    })
  ),
};
