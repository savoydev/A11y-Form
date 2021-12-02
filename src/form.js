import React, { useEffect, useState } from 'react';
import { validateInput } from './validation';
import FormError from './formerror';

const Form = ({ children, name }) => {
  let [inputErrors, setInputErrors] = useState([]);
  useEffect(() => {
    console.log('CHANGED');
  }, [inputErrors]);

  function submitMethod(e) {
    e.preventDefault();
    console.log('submit');
    const form = e.target;

    const inputsOnly = Array.from(form.elements).filter(
      (element) =>
        element.tagName !== 'BUTTON' && element.tagName !== 'FIELDSET'
    );
    inputsOnly.map((element) => {
      validateInput(element);
      console.log('element is valid', element.validity.valid);
      if (!element.validity.valid) {
        inputErrors.push({
          inputId: element.id,
          errorMessage: element.validationMessage,
        });
      }
      console.log(element.validationMessage);
    });
    if (e.target.checkValidity()) {
      console.log(getFormData(new FormData(form)));
    } else {
      console.log('form is not valid');
      console.log(inputErrors);
      setInputErrors(inputErrors);
    }
  }

  function getFormData(formData) {
    let formValues = {};
    for (var value of formData.entries()) {
      formValues[`${value[0]}`] = value[1];
    }
    return formValues;
  }
  return (
    <form name={name} noValidate onSubmit={submitMethod}>
      <FormError errors={inputErrors} />
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
