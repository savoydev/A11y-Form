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

const FieldSet = ({ children, legend, name, id }) => {
  fieldSetHasLegend(children);
  return (
    <fieldset id={id} name={name} className="form__fieldset fieldset">
      {!fieldSetHasLegend(children) && <Legend>{legend}</Legend>}
      {children}
    </fieldset>
  );
};

const Legend = ({ children }) => {
  return <legend className="fieldset__legend">{children}</legend>;
};

FieldSet.Legend = Legend;

export default FieldSet;
