export function invalidInputs(form) {
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

export function formDataAsObj(formData) {
  return Object.fromEntries(formData.entries());
}

export function errors(inputElements) {
  return inputElements.map(({ id, validationMessage }) => {
    return {
      id,
      validationMessage,
    };
  });
}

export function toggleButtonState(button) {
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
