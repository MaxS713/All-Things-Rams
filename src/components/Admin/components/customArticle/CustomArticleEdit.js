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
        <TextInput source="content" required />
      </SimpleForm>
    </Edit>
  );
};

export default CustomArticleEdit;