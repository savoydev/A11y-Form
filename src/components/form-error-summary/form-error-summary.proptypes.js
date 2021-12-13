import { exact, string, arrayOf } from 'prop-types';

export const formErrorSummaryPropTypes = {
  errors: arrayOf(
    exact({
      id: string.isRequired,
      validationMessage: string.isRequired,
    })
  ),
};

export const formErrorSummaryDefaultProps = {
  errors: [],
};
