import React from 'react';

const fieldSetHasLegend = (children) => {
  let fieldSetHasLegend = false;
  children.forEach((child) => {
    if (child.type === Legend) {
      fieldSetHasLegend = true;
    }
  });
  return fieldSetHasLegend;
};

const FieldSet = ({ children, legend, name }) => {
  fieldSetHasLegend(children);
  return (
    <fieldset name={name ?? legend} className="form__fieldset fieldset">
      {!fieldSetHasLegend(children) && <Legend>{legend ?? name}</Legend>}
      {children}
    </fieldset>
  );
};

const Legend = ({ children }) => {
  return <legend className="fieldset__legend">{children}</legend>;
};

FieldSet.Legend = Legend;

export default FieldSet;
