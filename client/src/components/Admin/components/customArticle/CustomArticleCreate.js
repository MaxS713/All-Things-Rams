import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const CustomArticleCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" required />
        <TextInput source="author" required />
        <TextInput source="date" required />
        <TextInput source="paragraph1" required />
        <TextInput source="paragraph2" />
        <TextInput source="paragraph3" />
        <TextInput source="paragraph4" />
        <TextInput source="paragraph5" />
        <TextInput source="paragraph6" />
        <TextInput source="paragraph7" />
        <TextInput source="paragraph8" />
      </SimpleForm>
    </Create>
  );
};

export default CustomArticleCreate;