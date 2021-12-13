import React, { useEffect, useState } from 'react';
import { validateInput } from '../../validation';
import { ARIA_ATTR, ATTR_BOOL, FORM_STATE } from '../../attributes';
import { FormErrorSummary, FieldSet } from '../.';
import * as Form from './form.class.js';
import { formPropTypes } from './form.proptypes';

const Form = ({ children, name, showValidationOn }) => {
  let [inputErrors, setInputErrors] = useState([]);
  let [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function submitMethod(e) {
    e.preventDefault();
    const form = e.target;
    if (form.dataset.formstate == FORM_STATE.SUBMITTING) return;
    form.dataset.formstate = FORM_STATE.SUBMITTING;
    const buttonState = toggleButtonState(e.nativeEvent.submitter);
    buttonState.toggleState();
    setInputErrors(errors(invalidInputs(form)));
    if (form.checkValidity()) {
      setFormData(formDataAsObj(new FormData(form)));
    }
    delete form.dataset.formstate;
    buttonState.toggleState();
  }
  return (
    <form
      className="form"
      data-showvalidation={showValidationOn}
      name={name}
      noValidate
      onSubmit={submitMethod}
    >
      <FormErrorSummary errors={inputErrors} />
      {children}
    </form>
  );
};

const Submit = ({ children }) => {
  const props = {
    ...children.props,
    type: 'submit',
  };
  return React.cloneElement(children, { ...props });
};

Form.FieldSet = FieldSet;
Form.Submit = Submit;
Form.propTypes = formPropTypes;

export default Form;
