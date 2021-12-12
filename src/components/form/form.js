import React, { useEffect, useState } from 'react';
import { validateInput, extend, EVENT_TYPES } from '../../validation';
import FormErrorSummary from '../form-error-summary/formerrorsummary';

const FORM_STATE = {
  INITIAL: 'initial',
  SUBMITTING: 'submitting',
  SUBMITTED: 'submitted',
};

const Form = ({ children, name }) => {
  let [inputErrors, setInputErrors] = useState([]);
  let [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function submitMethod(e) {
    e.preventDefault();
    const form = e.target;
    if (form.dataset.formstate == FORM_STATE.SUBMITTING) {
      return;
    }
    form.dataset.formstate = FORM_STATE.SUBMITTING;
    const buttonState = toggleButtonState(e.nativeEvent.submitter);
    buttonState.toggleState();
    setInputErrors(errors(invalidInputs(form)));
    if (e.target.checkValidity()) {
      setFormData(formDataAsObj(new FormData(form)));
    }
    delete form.dataset.formstate;
    buttonState.toggleState();
  }
  return (
    <form name={name} noValidate onSubmit={submitMethod} className="form">
      <FormErrorSummary errors={inputErrors} />
      {children}
    </form>
  );
};

function formDataAsObj(formData) {
  return Object.fromEntries(formData.entries());
}

function errors(inputElements) {
  return inputElements.map((element) => {
    return {
      inputId: element.id,
      errorMessage: element.validationMessage,
    };
  });
}

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

function toggleButtonState(button) {
  const buttonText = button.innerHTML;
  const submittingText = 'Submitting';
  const toggleState = () => {
    if (button.form.dataset.formstate == FORM_STATE.SUBMITTING) {
      button.innerHTML = submittingText;
      button.setAttribute('aria-disabled', 'true');
    } else {
      button.innerHTML = buttonText;
      button.removeAttribute('aria-disabled');
    }
  };
  return {
    toggleState,
  };
}

const Submit = ({ children }) => {
  const props = {
    ...children.props,
    type: 'submit',
  };
  return React.cloneElement(children, { ...props });
};

Form.Submit = Submit;

export default Form;
