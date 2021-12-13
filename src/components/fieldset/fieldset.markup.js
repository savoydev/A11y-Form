import React from 'react';
import Legend from './fieldset.legend.markup.js';
import { fieldSetPropTypes } from './fieldset.proptypes';
import { renderLegend } from './fieldset.class.js';

const FieldSet = ({ children, legend, name, id }) => {
  return (
    <fieldset id={id} name={name} className="form__fieldset fieldset">
      {renderLegend(children, legend)}
      {children}
    </fieldset>
  );
};

FieldSet.Legend = Legend;
FieldSet.propTypes = fieldSetPropTypes;
export default FieldSet;
