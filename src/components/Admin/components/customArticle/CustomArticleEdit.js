import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
const CustomArticleEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="title" required />
        <TextInput source="author" required />
        <TextInput source="date" required />
        <TextInput source="paragraph1" required />
        <TextInput source="paragraph2" />
        <TextInput source="paragraph3" />
        <TextInput source="paragraph4" />
        <TextInput source="paragraph5" />
      </SimpleForm>
    </Edit>
  );
};

export default CustomArticleEdit;