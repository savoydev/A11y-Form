import { ARIA_ATTR, ATTR_BOOL, DATA_ATTR, TAG_NAME } from './attributes';

export function extend(element) {
  const disabled = isDisabled(element);
  const errorMessageElement = document.getElementById(
    element.getAttribute(ARIA_ATTR.ERRORMESSAGE)
  );
  const inputGroup = document.querySelector(
    `[${DATA_ATTR.INPUT_ID}='${element.id}']`
  );
  const labelText = element.labels.item(0).innerText;
  const lengths = inputLengths(element);
  const required = element.getAttribute(ARIA_ATTR.REQUIRED) === ATTR_BOOL.TRUE;
  const trueValue = element.value;
  const value = element.value.trim();
  const valueMissing = required && value === '';

  let extendedElement = {
    attributes: element.getAttributeNames(),
    dataset: element.dataset,
    disabled,
    element,
    errorMessageElement,
    errors: element.errors,
    id: element.id,
    inputGroup,
    labels: element.labels,
    labelText,
    ...lengths,
    required,
    tagName: element.tagName,
    trueValue,
    validationMessage: element.validationMessage,
    validity: element.validity,
    value,
    valueMissing,
  };

  extendedElement.clearInvalidAttributes = function () {
    element.setAttribute(ARIA_ATTR.INVALID, ATTR_BOOL.FALSE);
    this.clearErrorMessageContent();
    this.inputGroup.setAttribute(DATA_ATTR.INVALID, ATTR_BOOL.FALSE);
  };

  extendedElement.clearValidationMessage = function () {
    this.element.setCustomValidity('');
  };

  extendedElement.getAttribute = function (attribute) {
    return this.element.getAttribute(attribute);
  };

  extendedElement.setCustomValidity = function (message) {
    return this.element.setCustomValidity(message);
  };

  extendedElement.checkValidity = function () {
    return this.element.checkValidity();
  };

  extendedElement.setAttribute = function (attribute, value) {
    this.element.setAttribute(attribute, value);
  };

  extendedElement.setRequiredError = function () {
    const customRequiredMessage = this.errors[ARIA_ATTR.REQUIRED];
    this.setCustomValidity(
      customRequiredMessage ?? errorMessages.required(this)
    );
  };

  extendedElement.setTooLongOrShortError = function () {
    this.setCustomValidity(errorMessages.tooLongOrShort(this));
  };

  extendedElement.setTooShortError = function () {
    const customTooShortMessage = this.errors[DATA_ATTR.MINLENGTH];
    this.setCustomValidity(
      customTooShortMessage ?? errorMessages.tooShort(this)
    );
  };

  extendedElement.setTooLongError = function () {
    const customTooLongMessage = this.errors[DATA_ATTR.MAXLENGTH];
    this.setCustomValidity(customTooLongMessage ?? errorMessages.tooLong(this));
  };

  extendedElement.setErrorMessageContent = function (message) {
    this.errorMessageElement.innerText = message;
  };

  extendedElement.clearErrorMessageContent = function () {
    this.setErrorMessageContent('');
  };

  extendedElement.setErrorMessageContentToValidationMessage = function () {
    this.setErrorMessageContent(this.validationMessage);
  };
  return extendedElement;
}

function inputLengths(element) {
  const min = element.getAttribute(DATA_ATTR.MINLENGTH) ?? null;
  const max = element.getAttribute(DATA_ATTR.MAXLENGTH) ?? null;
  const value = element.value.trim().length;
  return {
    min,
    max,
    value,
    exceededMaxLength: max === null ? false : value > max,
    overage: () => {
      return value - max;
    },
    hasMinAndMax: max !== null && min !== null,
    lessThanMinLength: min === null ? false : value < min,
  };
}

export function isDisabled(element) {
  return element.getAttribute(ARIA_ATTR.DISABLED) === ATTR_BOOL.TRUE;
}

const errorMessages = {
  required: (inputElement) => createRequiredInputText(inputElement),
  tooLongOrShort: (inputElement) => createRangeText(inputElement),
  tooShort: (inputElement) => createTooShortText(inputElement),
  tooLong: (inputElement) => createTooLongText(inputElement),
};

function createRequiredInputText({ tagName, labelText }) {
  let returnString = tagName === TAG_NAME.INPUT ? 'Enter' : 'Select';
  returnString += ` a(n) ${labelText}.`;
  return returnString;
}

function createTooShortText({ labelText, lengths: { min } }) {
  return `${labelText} must be ${min} characters or more.`;
}

function createTooLongText({ labelText, lengths }) {
  return `${labelText} must be ${
    lengths.max
  } characters or fewer. You have ${lengths.overage()} characters too many.`;
}

function createRangeText({ labelText, lengths }) {
  return `${labelText} must be between ${lengths.min} and ${lengths.max} characters.`;
}
