import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
const InstaUserCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="fullName" required />
        <TextInput source="username" required />
      </SimpleForm>
    </Create>
  );
};

export default InstaUserCreate;