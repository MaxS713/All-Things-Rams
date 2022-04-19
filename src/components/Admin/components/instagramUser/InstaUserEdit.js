import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
const InstaUserEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="fullName" required />
        <TextInput source="username" required />
      </SimpleForm>
    </Edit>
  );
};

export default InstaUserEdit;