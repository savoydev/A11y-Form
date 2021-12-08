import React from 'react';
import './style.css';
import Form from './form';
import Input from './input';
import FieldSet from './fieldset';
import Button from './components/button/button';

export default function App() {
  return (
    <Form name="testing">
      <FieldSet>
        <FieldSet.Legend>Identity</FieldSet.Legend>
        <Input
          name="FirstName"
          id="FirstName"
          required={true}
          // minLength="5"
          maxLength="10"
          description="Enter your first name as shown on your ID"
          labelText="First name"
        />
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
