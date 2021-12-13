import React from 'react';
import './style.css';
import Form from './components/form/form';
import InputGroup from './components/input/group/input-group';
import FieldSet from './components/fieldset/fieldset';
import Button from './components/button/button';
import { EVENT_TYPES } from './attributes';
import { AutoInput } from './components/input';

export default function App() {
  return (
    <Form name="testing">
      <Form.FieldSet name="Identity" legend="Identity">
        <InputGroup inputId="Nickname">
          <InputGroup.Label id="NicknameLabel" htmlFor="Nickname">
            Nickname
          </InputGroup.Label>
          <InputGroup.Description id="NicknameDescribedBy">
            A nickname could be something your friends call you
            <span>Cool</span>
          </InputGroup.Description>
          <InputGroup.Error id="NicknameErrorMsg" />
          <InputGroup.Input
            descriptionId="NicknameDescribedBy"
            errorMessageId="NicknameErrorMsg"
            id="Nickname"
            labelId="NicknameLabel"
            placeholder="Nickname"
            type="text"
            showValidationOn={EVENT_TYPES.INPUT}
            validation={{
              minlength: {
                value: 5,
                message: 'This needs more characters!',
              },
              // maxlength: {
              //   value: 10,
              //   message: 'Way too many characters, chill.',
              // },
              required: {
                value: true,
                message: 'You better type somethig in here.',
              },
            }}
          />
        </InputGroup>
        <AutoInput
          id="LastName"
          labelText="Your Last Name"
          showValidationOn={EVENT_TYPES.BLUR}
          validation={{
            minlength: {
              value: 2,
            },
          }}
        />
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
      </Form.FieldSet>
      <Form.Submit>
        <Button>Submit</Button>
      </Form.Submit>
    </Form>
  );
}
