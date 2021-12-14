import { AUTO_SUFFIX } from '../../../attributes';

// label object
// error object
// group object
// input object
// description object

// create inputId first
export function inputIdGen(inputObject, id) {
  return inputObject?.id ?? id;
}

export function inputRequired(inputObject, required) {
  return inputObject?.required ?? required;
}

export function nameGen(inputObject, inputId) {
  return inputObject?.name ?? inputId;
}

export function labelId(labelObject, inputId) {
  return labelObject?.id ?? `${inputId}${AUTO_SUFFIX.LABEL}`;
}

export function labelFor(labelObject, inputId) {
  return labelObject?.for ?? inputId;
}

export function labelTextGen(labelObject, labelText) {
  return labelObject?.text ?? labelText;
}

export function errorMessageId(errorObject, inputId) {
  return errorObject?.id ?? `${inputId}${AUTO_SUFFIX.ERROR_MSG}`;
}

export function groupId(groupObject, inputId) {
  return groupObject?.inputId ?? inputId;
}

export function descriptionId(description, inputId) {
  return description?.id ?? `${inputId}${AUTO_SUFFIX.DESCRIPTION}`;
}

export function autoInputDescision(inputObject, id) {
  const input = inputObject;

  const inputId = inputIdGen(input, id);
  const name = nameGen(input, inputId);
  let autoObj = {
    input,
    inputId,
    name,
  };

  autoObj.descriptionId = function descriptionIdGen(description) {
    this.descriptionId = descriptionId(description, this.inputId);
  };

  autoObj.groupId = function groupIdGen(groupObject) {
    this.groupId = groupId(groupObject, this.inputId);
  };

  autoObj.errorMessageId = function errorMessageIdGen(errorObj) {
    this.errorMessageId = errorMessageId(errorObj, this.inputId);
  };

  autoObj.required = function (required) {
    this.required = inputRequired(this.input, required);
  };

  autoObj.label = function labelGen(labelObject, labelText) {
    this.labelId = labelId(labelObject, this.inputId);
    this.labelFor = labelFor(labelObject, this.inputId);
    this.labelText = labelTextGen(labelObject, labelText);
  };

  return autoObj;
}
