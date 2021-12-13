import React, { useEffect, useState } from 'react';
import {
  validateInput,
  ARIA_ATTR,
  ATTR_BOOL,
  FORM_STATE,
} from '../../validation';
import FormErrorSummary from '../form-error-summary/formerrorsummary';
import FieldSet from '../fieldset/fieldset'
import {formPropTypes} from './proptypes'

function invalidInputs(form) {
  return Array.from(form.elements).filter((element) => {
    if (element.tagName.match(/INPUT|SELECT|TEXTAREA|\\./g)) {
      validateInput(element);
      element.checkValidity();
      if (!element.validity.valid) {
        return element;
      }
    }
  });
}

function formDataAsObj(formData) {
  return Object.fromEntries(formData.entries());
}

function errors(inputElements) {
  return inputElements.map(({ id, validationMessage }) => {
    return {
      id,
      validationMessage,
    };
  });
}

function toggleButtonState(button) {
  const buttonText = button.innerHTML;
  const submittingText = 'Submitting';
  const toggleState = () => {
    if (button.form.dataset.formstate == FORM_STATE.SUBMITTING) {
      button.innerHTML = submittingText;
      button.setAttribute(ARIA_ATTR.DISABLED, ATTR_BOOL.TRUE);
    } else {
      button.innerHTML = buttonText;
      button.removeAttribute(ARIA_ATTR.DISABLED);
    }
  };
  return {
    toggleState,
  };
}

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
