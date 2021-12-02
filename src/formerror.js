import React from 'react';

const FormError = ({ errors }) => {
  return errors.length > 0 ? (
    <div>
      <p>There is a problem</p>
      {errors.map((error) => {
        <a href={`#${error.id}`}>{error.errorMessage}</a>;
      })}
    </div>
  ) : null;
};

export default FormError;
