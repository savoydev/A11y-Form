import React from 'react';

const FormErrorSummary = ({ errors }) => {
  return errors.length > 0 ? (
    <div className="form__error-summary">
      <p>There is a problem</p>
      <ul>
        {errors.map((error) => {
          return (
            <li key={error.inputId}>
              <a href={`#${error.inputId}`}>{error.errorMessage}</a>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
};

export default FormErrorSummary;
