import React from 'react';
import {inputLabelPropTypes, inputLabelDefaultProps} from './input-label.proptypes.js'

const InputLabel = ({ id, disabled, children, htmlFor }) => {
  return (
    <label
      className="input-group__label"
      id={id}
      htmlFor={htmlFor}
      disabled={disabled}
    >
      {children}
    </label>
  );
};

InputLabel.propTypes = inputLabelPropTypes;
InputLabel.defaultProps = inputLabelDefaultProps;
export default InputLabel;
