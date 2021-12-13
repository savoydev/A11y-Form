import Legend from './fieldset.legend.markup.js'

export const fieldSetHasLegend = (children) => {
  let fieldSetHasLegend = false;
  Array.from(children).forEach((child) => {
    if (child.type === Legend) {
      fieldSetHasLegend = true;
    }
  });
  return fieldSetHasLegend;
};