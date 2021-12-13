export const buildLabelId = () => {
  return label?.id ?? computedLabelId;
};

export const buildLabelFor = () => {
  return label?.for ?? inputId;
};

export const buildLabelText = () => {
  return label?.text ?? labelText;
};

export const buildErrorMessageId = () => {
  return error?.id ?? computedErrorMsgId;
};

export const buildGroupId = () => {
  return group?.inputId ?? inputId;
};

export const buildInputRequired = () => {
  return input?.required ?? required;
};

export const buildInputName = () => {
  return input?.name ?? inputId;
};

export const buildDescriptionId = () => {
  return description?.id ?? computedDescriptionId;
};
