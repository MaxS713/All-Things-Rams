import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const CustomArticleCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" required />
        <TextInput source="author" required />
        <TextInput source="date" required />
        <TextInput source="content" required />
      </SimpleForm>
    </Create>
  );
};

export default CustomArticleCreate;