import React from 'react';
import {
  formErrorSummaryPropTypes,
  formErrorSummaryDefaultProps,
} from './form-error-summary.proptypes';

const FormErrorSummary = ({ errors }) => {
  return errors.length > 0 ? (
    <div className="form__error-summary error-summary">
      <p className="error-summary__heading">There is a problem</p>
      <ul className="error-summary__error-list error-list">
        {errors.map((error) => {
          return (
            <li className="error-list__item" key={error.id}>
              <a href={`#${error.id}`}>{error.validationMessage}</a>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
};

FormErrorSummary.propTypes = formErrorSummaryPropTypes;
FormErrorSummary.defaultProps = formErrorSummaryDefaultProps;
export default FormErrorSummary;
