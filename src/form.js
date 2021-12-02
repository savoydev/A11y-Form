import React from 'react';
import { validateInput } from './validation';

function submitMethod(e) {
  e.preventDefault();
  const form = e.target;

  const inputsOnly = Array.from(form.elements).filter(
    (element) => element.tagName !== 'BUTTON' && element.tagName !== 'FIELDSET'
  );
  inputsOnly.map((element) => {
    validateInput(element);
    console.log('element is valid', element.validity.valid);
    console.log(element.validationMessage);
  });
  if (e.target.checkValidity()) {
    console.log(getFormData(new FormData(form)));
  }
}

function getFormData(formData) {
  let formValues = {};
  for (var value of formData.entries()) {
    formValues[`${value[0]}`] = value[1];
  }
  return formValues;
}

const Form = ({ children, name }) => {
  return (
    <form name={name} noValidate onSubmit={submitMethod}>
      {children}
    </form>
  );
};

const Submit = ({ children }) => {
  const props = { ...children.props, type: 'submit' };
  return React.cloneElement(children, { ...props });
};

Form.Submit = Submit;

export default Form;
