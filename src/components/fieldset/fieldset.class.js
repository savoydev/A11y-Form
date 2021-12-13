import React from 'react'
import Legend from './fieldset.legend.markup.js'

const fieldSetHasLegend = (children) => {
  let fieldSetHasLegend = false;
  Array.from(children).forEach((child) => {
    if (child.type === Legend) {
      fieldSetHasLegend = true;
    }
  });
  return fieldSetHasLegend;
};

export const renderLegend = (children, legendText) => {
  return fieldSetHasLegend(children) ? null : <Legend>{legendText}</Legend>
};