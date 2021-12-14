import {
  VALIDATION_ATTR,
  ARIA_ATTR,
  ATTR_BOOL,
  DATA_ATTR,
  TAG_NAME,
} from './attributes';
import { extend } from './extended-element';

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

const inputType = {
  button: 'button',
  checkbox: 'checkbox',
  color: 'color',
  date: 'date',
  datetimeLocal: 'datetime-local',
  email: 'email',
  file: 'file',
  hidden: 'hidden',
  image: 'image',
  month: 'month',
  number: 'number',
  password: 'password',
  radio: 'radio',
  range: 'range',
  reset: 'reset',
  search: 'search',
  submit: 'submit',
  tel: 'tel',
  text: 'text',
  time: 'time',
  url: 'url',
  week: 'week',
};

const dateTypeAttributes = {
  value: '',
  max: '',
  min: '',
  step: '',
};

const emailTypeAttributes = {
  value: '',
  list: '',
  maxlength: '',
  minlength: '',
  multiple: '',
  pattern: '',
  placeholder: '',
  readonly: '',
  size: '',
};

const monthTypeAttributes = {
  value: '',
  list: '',
  max: '',
  min: '',
  readonly: '',
  step: '',
};

const numberTypeAttributes = {
  value: '',
  list: '',
  max: '',
  min: '',
  placeholder: '',
  readonly: '',
  step: '',
};

const checkboxTypeAttributes = {
  value: '',
  name: '',
  checked: '',
};
const searchTypeAttributes = {
  value: '',
  list: '',
  maxlength: '',
  minlength: '',
  pattern: '',
  placeholder: '',
  readonly: '',
  spellcheck: '',
  name: '',
};

const telTypeAttributes = {
  value: '',
  list: '',
  maxlength: '',
  minlength: '',
  pattern: '',
  placeholder: '',
  readonly: '',
  size: '',
};

const textTypeAttributes = {
  value: '',
  list: '',
  maxlength: '',
  minlength: '',
  pattern: '',
  placeholder: '',
  readonly: '',
  size: '',
  spellcheck: '',
};

const globalInputAttributes = {
  accept: '',
  alt: '',
  automcomplete: '',
  autofocus: '',
  capture: '',
  checked: '',
  dirname: '',
  disabled: '',
  form: '',
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

export function parseConstraints(validation) {
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

export function setInvalid(target) {
  const element = extend(target);
  element.setAttribute(ARIA_ATTR.INVALID, ATTR_BOOL.TRUE);
  element.setErrorMessageContentToValidationMessage();
  element.inputGroup.dataset.invalid = ATTR_BOOL.TRUE;
}

export function validateInput(element) {
  element = extend(element);
  if (element.disabled) return;
  if (element.valueMissing) {
    element.setRequiredError();
  } else if (
    element.hasMinAndMax &&
    (element.lessThanMinLength || element.exceededMaxLength)
  ) {
    element.setTooLongOrShortError();
  } else if (element.lessThanMinLength) {
    element.setTooShortError();
  } else if (element.exceededMaxLength) {
    element.setTooLongError();
  } else {
    element.clearValidationMessage();
  }
  if (element.checkValidity()) {
    element.clearInvalidAttributes();
  }
}
