import React from 'react'
import InputGroup from './group/input-group'

let label = {
  id: '',
  disabled: '',
  children: '',
  htmlFor: ''
}

let description = {
  id: '',
  children: ''
}

let error = {
  id: '',
  children: ''
}

const AutoInput = props => {
  <InputGroup>
    <InputGroup.Label></InputGroup.Label>
    <InputGroup.Description></InputGroup.Description>
    <InputGroup.Error />
    <InputGroup.Input />
  </InputGroup>
}

export default AutoInput;