import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
const TweetsCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="text" required />
      </SimpleForm>
    </Create>
  );
};

export default TweetsCreate;