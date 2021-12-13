export const AUTO_SUFFIX = {
  LABEL: 'Label',
  ERROR_MSG: 'ErrorMsg',
  DESCRIPTION: 'DescribedBy',
};

export const TAG_NAME = {
  INPUT: 'INPUT',
  SELECT: 'SELECT',
  TEXTAREA: 'TEXTAREA',
  FIELDSET: 'FIELDSET',
};

export const AUTOCOMPLETE = {
  ON: 'on',
  OFF: 'off',
  NAME: 'name',
  HONORIFICPREFIX: 'honorific-prefix',
  GIVENAME: 'given-name',
  ADDITIONALNAME: 'additional-name',
  FAMILYNAME: 'family-name',
  NICKNAME: 'nickname',
  HONORIFICSUFFIX: 'honorific-suffix',
  USERNAME: 'username',
  NEWPASSWORD: 'new-password',
  CURRENTPASSWORD: 'current-password',
  ONETIMECODE: 'one-time-code',
};

export const ARIA_ATTR = {
  INVALID: 'aria-invalid',
  DESCRIBEDBY: 'aria-describedby',
  ERRORMESSAGE: 'aria-errormessage',
  LABELLEDBY: 'aria-labelledby',
  REQUIRED: 'aria-required',
  DISABLED: 'aria-disabled',
};

export const INPUT_ATTR = {
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

export const DATA_ATTR = {
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
  required: ARIA_ATTR.REQUIRED,
};

export const FORM_STATE = {
  INITIAL: 'INITIAL',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED: 'SUBMITTED',
};

export const EVENT_TYPES = {
  BLUR: 'blur',
  INPUT: 'input',
  SUBMIT: 'submit',
};

export const INPUT_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
};

export const ATTR_BOOL = {
  TRUE: 'true',
  FALSE: 'false',
  ON: 'on',
  OFF: 'off',
};
