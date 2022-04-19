import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
const TwitterUserEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput required source="twitterHandle" />
        <TextInput required source="userID" />
      </SimpleForm>
    </Edit>
  );
};

export default TwitterUserEdit;