import React from 'react';
import Legend from './fieldset.legend.markup.js';
import { fieldSetPropTypes } from './fieldset.proptypes';
import { fieldSetHasLegend } from './fieldset.class.js';

const FieldSet = ({ children, legend, name, id }) => {
  fieldSetHasLegend(children);
  return (
    <fieldset id={id} name={name} className="form__fieldset fieldset">
      {!fieldSetHasLegend(children) && <Legend>{legend}</Legend>}
      {children}
    </fieldset>
  );
};

FieldSet.Legend = Legend;
FieldSet.propTypes = fieldSetPropTypes;
export default FieldSet;
