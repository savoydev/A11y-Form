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
  DISABLED: 'data-disabled',
};

const EVENT_TYPES = {
  BLUR: 'blur',
  INPUT: 'input',
};

export const INPUT_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
};

const ATTR_BOOL = {
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
  const min = element.getAttribute(INPUT_ATTR.MINLENGTH);
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
  console.log('INVALID',target.id)
  const element = extend(target);
  element.setAttribute(ARIA_ATTR.INVALID, ATTR_BOOL.TRUE);
  console.log('ERROR ELEMENT', element.errorMessageElement)
  element.errorMessageElement.innerText = element.validationMessage;
  element.inputGroup.dataset.invalid = ATTR_BOOL.TRUE;
}

const errorMessages = {
  required: (inputElement) => createRequiredInputText(inputElement),
  tooLongOrShort: (inputElement) => createRangeText(inputElement),
  tooShort: (inputElement) => createTooShortText(inputElement),
  tooLong: (inputElement) => createTooLongText(inputElement),
};

export function extend(element) {
  console.log(`${element.id}`, element.labels)
  const labelText = element.labels.item(0).innerText;
  const lengths = inputLengths(element);
  const required = element.getAttribute(ARIA_ATTR.REQUIRED) === ATTR_BOOL.TRUE;
  const trueValue = element.value,
  const value = element.value.trim();
  const valueMissing = required && value === '';
  const errorMessageElement = document.getElementById(element.getAttribute(ARIA_ATTR.ERRORMESSAGE));
  const inputGroup = document.querySelector(
    `[${DATA_ATTR.INPUT_ID}='${element.id}']`
  );
  return {
    element,
    id: element.id,
    tagName: element.tagName,
    validity: element.validity,
    dataset: element.dataset,
    labels: element.labels,
    validationMessage: element.validationMessage,
    attributes: element.getAttributeNames(),
    labelText,
    required,
    trueValue,
    inputGroup,
    errorMessageElement,
    value,
    lengths,
    valueMissing,
    clearValidationMessage: () => element.setCustomValidity(''),
    getAttribute: (attribute) => element.getAttribute(attribute),
    setCustomValidity: (message) => element.setCustomValidity(message),
    checkValidity: () => element.checkValidity(),
    setAttribute: (attribute, value) =>
      element.setAttribute(attribute, value),
    clearInvalidAttributes: () => clearInvalidAttributes(element)
  };
}

export function validateInput(element) {
  if(isDisabled(element)) return;
  element = extend(element);
  if (element.valueMissing) {
    element.setCustomValidity(errorMessages.required(element));
  } else if (
    element.lengths.hasMinAndMax() &&
    (element.validity.tooShort || element.lengths.lessThanMinLength() || element.lengths.exceededMaxLength())
  ) {
    element.setCustomValidity(errorMessages.tooLongOrShort(element));
  } else if (element.validity.tooShort || element.lengths.lessThanMinLength()) {
    element.setCustomValidity(errorMessages.tooShort(element));
  } else if (element.lengths.exceededMaxLength()) {
    element.setCustomValidity(errorMessages.tooLong(element));
  } else {
    element.clearValidationMessage();
  }
  if (element.checkValidity()) {
    element.clearInvalidAttributes();
  }
}

function clearInvalidAttributes(element) {
  element.setAttribute(ARIA_ATTR.INVALID, ATTR_BOOL.FALSE);
  const inputGroup = document.querySelector(
    `[${DATA_ATTR.INPUT_ID}='${element.id}']`
  );
  const errorMessage = document.getElementById(
    element.getAttribute(ARIA_ATTR.ERRORMESSAGE)
  );
  errorMessage.innerText = '';
  inputGroup.dataset.invalid = ATTR_BOOL.FALSE;
}


export function isDisabled(element) {
  const isDisabled = element.getAttribute('aria-disabled');
  return isDisabled === ATTR_BOOL.TRUE
}