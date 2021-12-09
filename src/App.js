import React from 'react';
import './style.css';
import Form from './components/form/form';
import Input from './components/input/input';
import InputGroup from './components/input/group/input-group';
import InputLabel from './components/input/label/input-label';
import InputDescription from './components/input/description/input-description';
import FieldSet from './components/fieldset/fieldset';
import Button from './components/button/button';

export default function App() {
  return (
    <Form name="testing">
      <FieldSet>
        <FieldSet.Legend>Identity</FieldSet.Legend>
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
            minLength={2}
            maxLength={5}
            name="Nickname"
            aria-labelledby="NicknameLabel"
          />
        </InputGroup>
        <InputGroup inputId="FirstName">
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
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Middle Name</InputLabel>
          <InputDescription>
            Your middle name is between your first and last name
          </InputDescription>
        </InputGroup>
        <Input
          name="Another"
          required={true}
          id="Another"
          labelText="Last name"
        />
      </FieldSet>
      <Form.Submit>
        <Button>Submit</Button>
      </Form.Submit>
    </Form>
  );
}
