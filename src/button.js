import React from 'react';

const Button = (props) => {
  console.log('button', props);
  const { children, ...other } = props;
  return <button {...other}>{children}</button>;
};

export default Button;

// console.log(element.tagName.includes('INPUT'));
// const test = new RegExp(/INPUT|SELECT|TEXTAREA|\\./g);
// console.log(element.tagName.match(test));
// element.tagName.includes('INPUT');
