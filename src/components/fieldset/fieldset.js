import React from 'react';

const FieldSet = ({ children }) => {
  return <fieldset className="form__fieldset fieldset">{children}</fieldset>;
};

const Legend = ({ children }) => {
  return <legend className="fieldset__legend">{children}</legend>;
};

FieldSet.Legend = Legend;

export default FieldSet;
