import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
const TweetsEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput required source="text" />
      </SimpleForm>
    </Edit>
  );
};

export default TweetsEdit;