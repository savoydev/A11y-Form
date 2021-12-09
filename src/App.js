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
          <InputGroup.Label id="NicknameLabel">Nickname</InputGroup.Label>
          <InputGroup.Description>
            A nickname could be something your friends call you
          </InputGroup.Description>
        </InputGroup>
        <Input
          name="FirstName"
          id="FirstName"
          required={true}
          // minLength="5"
          maxLength="10"
          description="Enter your first name as shown on your ID"
          labelText="First name"
          disabled={true}
        />
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
