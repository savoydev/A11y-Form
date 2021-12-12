import React from 'react';
import './style.css';
import Form from './components/form/form';
import InputGroup from './components/input/group/input-group';
import FieldSet from './components/fieldset/fieldset';
import Button from './components/button/button';
import AutoInput from './components/input/auto-input';
import { EVENT_TYPES } from './validation.js';

export default function App() {
  return (
    <Form name="testing">
      <FieldSet name="Identity" legend="Identity">
        <InputGroup inputId="Nickname">
          <InputGroup.Label id="NicknameLabel" htmlFor="Nickname">
            Nickname
          </InputGroup.Label>
          <InputGroup.Description>
            A nickname could be something your friends call you
          </InputGroup.Description>
          <InputGroup.Error id="NicknameErrorMsg" />
          <InputGroup.Input
            id="Nickname"
            placeholder="Nickname"
            type="text"
            name="Nickname"
            aria-labelledby="NicknameLabel"
            errorMessageId="NicknameErrorMsg"
            showValidationOn={EVENT_TYPES.INPUT}
            validation={[
              {
                property: 'data-minlength',
                value: 4,
                message: 'This is not long enough',
              },
              // {
              //   property: 'data-maxlength',
              //   value: 6,
              //   message: 'Too long, man',
              // },
              {
                property: 'aria-required',
                value: true,
                message: 'You gotta fill this out',
              },
            ]}
          />
        </InputGroup>
        {/* <InputGroup inputId="FirstName">
          <InputGroup.Label
            id="FirstNameLabel"
            htmlFor="FirstName"
            required={true}
          >
            First Name
          </InputGroup.Label>
          <InputGroup.Description>
            Enter your first name as shown as your ID
          </InputGroup.Description>
          <InputGroup.Error id="FirstNameErrorMsg" />
          <InputGroup.Input
            id="FirstName"
            name="FirstName"
            required={true}
            maxLength="10"
            errorMessageId="FirstNameErrorMsg"
          />
        </InputGroup>
        <AutoInput id="LastName" labelText="Your Last Name" /> */}
      </FieldSet>
      <Form.Submit>
        <Button>Submit</Button>
      </Form.Submit>
    </Form>
  );
}
