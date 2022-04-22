import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
const NewsEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="isFeatured" required />
      </SimpleForm>
    </Edit>
  );
};

export default NewsEdit;