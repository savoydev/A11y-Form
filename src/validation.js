const validate = {
  mindate: '',
  maxdate: '',
  minnumber: '',
  maxnumber: '',
  minlength: '',
  maxlength: '',
  required: '',
  email: '',
  wholenumber: '',
  decimal: '',
  money: '',
};

const datatype = {
  date: '',
  email: '',
  telephone: '',
  text: '',
  alphanumeric: '',
  alphaonly: '',
  wholenumber: '',
  decimal: '',
  money: '',
  dateday: '',
  datemonth: '',
  dateyear: '',
  pattern: '',
};

export const AUTO_SUFFIX = {
  LABEL: 'Label',
  ERROR_MSG: 'ErrorMsg',
  DESCRIPTION: 'DescribedBy'
}

const dataTypes = {
  wholeNumber: {
    pattern: '[0-9]*',
    inputmode: 'numeric',
  },
  decimal: {
    pattern: '[-+]?[0-9]*[.,]?[0-9]+',
  },
  alphaNumeric: { pattern: '[a-zA-Z0-9]+' },
  dateYYYMMDD: {
    pattern:
      '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))',
  },
  dateMMDDYYYY: {
    pattern:
      '(?:(?:0[1-9]|1[0-2])[/\\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[/\\-. ]?30)|(?:(?:0[13578]|1[02])[/\\-. ]?31))[/\\-. ]?(?:19|20)[0-9]{2}',
  },
};

export const ARIA_ATTR = {
  INVALID: 'aria-invalid',
  DESCRIBEDBY: 'aria-describedby',
  ERRORMESSAGE: 'aria-errormessage',
  LABELLEDBY: 'aria-labelledby',
  REQUIRED: 'aria-required',
  DISABLED: 'aria-disabled'
};

const INPUT_ATTR = {
  MINLENGTH: 'minlength',
  MAXLENGTH: 'maxlength',
  PATTERN: 'pattern',
  AUTOCOMPLETE: 'autoComplete',
  SPELLCHECK: 'spellCheck',
  PLACEHOLDER: 'placeholder',
  TYPE: 'type',
  NAME: 'name',
  READONLY: 'readOnly',
  ID: 'id',
};

const DATA_ATTR = {
  INPUT_ID: 'data-input-id',
  INVALID: 'data-invalid',
  REQUIRED: 'data-required',
  MAXLENGTH: 'data-maxlength',
  MINLENGTH: 'data-minlength',
  DISABLED: 'data-disabled',
};

export const VALIDATION_ATTR = {
  minlength: DATA_ATTR.MINLENGTH,
  maxlength: DATA_ATTR.MAXLENGTH,
  required: ARIA_ATTR.REQUIRED
}

export const FORM_STATE = {
  INITIAL: 'INITIAL',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED: 'SUBMITTED',
};

export const EVENT_TYPES = {
  BLUR: 'blur',
  INPUT: 'input',
  SUBMIT: 'submit'
};

export const INPUT_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
};

export const ATTR_BOOL = {
  TRUE: 'true',
  FALSE: 'false'
}

const autoComplete = {
  on: 'on',
  name: 'name',
  honorificPrefix: 'honorific-prefix',
  givenName: 'given-name',
  additionalName: 'additional-name',
  familyName: 'family-name',
  nickName: 'nickname',
  honorifixSuffix: 'honorific-suffix',
  username: 'username',
  newPassword: 'new-password',
  currentPassword: 'current-password',
  oneTimeCode: 'one-time-code',
};

export function parseValidationObject(validation) {
  if (validation == null) return;
  let contraints = {};
  let validationMessages = {};
  Object.entries(validation).forEach((constraint) => {
    const constraintName = VALIDATION_ATTR[`${constraint[0]}`];
    const constraintValue = constraint[1].value;
    const message = constraint[1].message;
    contraints[constraintName] = constraintValue;
    validationMessages[constraintName] = message;
  });
  return [contraints, validationMessages];
}

function createRequiredInputText({ tagName, labelText }) {
  let returnString = tagName === 'INPUT' ? 'Enter' : 'Select';
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

function inputLengths(element) {
  const min = element.dataset.minlength ?? null;
  const max = element.dataset.maxlength ?? null;
  const value = element.value.trim().length;
  return {
    min,
    max,
    value,
    exceededMaxLength: () => {
      return max === null ? false : value > max;
    },
    overage: () => {
      return value - max;
    },
    hasMinAndMax: () => {
      return max !== null && min !== null;
    },
    lessThanMinLength: () => {
      return min === null ? false : value < min;
    }
  };
}

export function setInvalid(target) {
  const element = extend(target);
  element.setAttribute(ARIA_ATTR.INVALID, ATTR_BOOL.TRUE);
  element.setErrorMessageContentToValidationMessage();
  element.inputGroup.dataset.invalid = ATTR_BOOL.TRUE;
}

const errorMessages = {
  required: (inputElement) => createRequiredInputText(inputElement),
  tooLongOrShort: (inputElement) => createRangeText(inputElement),
  tooShort: (inputElement) => createTooShortText(inputElement),
  tooLong: (inputElement) => createTooLongText(inputElement),
};

export function isDisabled(element) {
  return element.getAttribute(ARIA_ATTR.DISABLED) === ATTR_BOOL.TRUE
}

export function extend(element) {
  const disabled = isDisabled(element);
  const errorMessageElement = document.getElementById(element.getAttribute(ARIA_ATTR.ERRORMESSAGE));
  const inputGroup = document.querySelector(
    `[${DATA_ATTR.INPUT_ID}='${element.id}']`
  );
  const labelText = element.labels.item(0).innerText;
  const lengths = inputLengths(element);
  const required = element.getAttribute(ARIA_ATTR.REQUIRED) === ATTR_BOOL.TRUE;
  const trueValue = element.value,
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
    lengths,
    required,
    tagName: element.tagName,
    trueValue,
    validationMessage: element.validationMessage,
    validity: element.validity,
    value,
    valueMissing,
  };

  extendedElement.clearInvalidAttributes = function() {
    element.setAttribute(ARIA_ATTR.INVALID, ATTR_BOOL.FALSE);
    this.clearErrorMessageContent();
    this.inputGroup.dataset.invalid = ATTR_BOOL.FALSE;
  }

  extendedElement.clearValidationMessage = function() {
    this.element.setCustomValidity('')
  }

  extendedElement.getAttribute = function(attribute) {
    return this.element.getAttribute(attribute)
  }

  extendedElement.setCustomValidity = function(message) {
    return this.element.setCustomValidity(message)
  }

  extendedElement.checkValidity = function() {
    return this.element.checkValidity();
  }

  extendedElement.setAttribute = function(attribute, value) {
    this.element.setAttribute(attribute, value)
  }

  extendedElement.hasMinAndMax = function() {
    return this.lengths.hasMinAndMax();
  }

  extendedElement.lessThanMinLength = function() {
    return this.lengths.lessThanMinLength();
  }

  extendedElement.exceededMaxLength = function() {
    return this.lengths.exceededMaxLength();
  }

  extendedElement.setRequiredError = function() {
    const customRequiredMessage = this.errors[ARIA_ATTR.REQUIRED];
    this.setCustomValidity(customRequiredMessage ??errorMessages.required(this))
  }

  extendedElement.setTooLongOrShortError = function() {
    this.setCustomValidity(errorMessages.tooLongOrShort(this));
  }

  extendedElement.setTooShortError = function() {
    const customTooShortMessage = this.errors[DATA_ATTR.MINLENGTH]
    this.setCustomValidity(customTooShortMessage ?? errorMessages.tooShort(this));
  }

  extendedElement.setTooLongError = function() {
    const customTooLongMessage = this.errors[DATA_ATTR.MAXLENGTH];
    this.setCustomValidity(customTooLongMessage ?? errorMessages.tooLong(this));
  }

  extendedElement.setErrorMessageContent = function(message) {
    this.errorMessageElement.innerText = message;
  }

  extendedElement.clearErrorMessageContent = function() {
    this.setErrorMessageContent('')
  }

  extendedElement.setErrorMessageContentToValidationMessage = function() {
    this.setErrorMessageContent(this.validationMessage)
  }

  return extendedElement;
}

export function validateInput(element) {
  element = extend(element);
  if(element.disabled) return;
  if (element.valueMissing) {
    element.setRequiredError();
  } else if (
    element.hasMinAndMax() &&
    (element.lessThanMinLength() || element.exceededMaxLength())
  ) {
    element.setTooLongOrShortError();
  } else if (element.lessThanMinLength()) {
    element.setTooShortError();
  } else if (element.exceededMaxLength()) {
    element.setTooLongError();
  } else {
    element.clearValidationMessage();
  }
  if (element.checkValidity()) {
    element.clearInvalidAttributes();
  }
}


