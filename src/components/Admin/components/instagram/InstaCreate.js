import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
const TweetsCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput required source="path" />
        <TextInput required source="author" />
        <TextInput required source="time" />
      </SimpleForm>
    </Create>
  );
};

export default TweetsCreate;