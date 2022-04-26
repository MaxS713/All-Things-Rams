import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
const SurveyEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
      <TextInput required source="surveyQuestion" />
        <TextInput required source="textAnswer1" />
        <TextInput required source="textAnswer2" />
        <TextInput source="textAnswer3" />
        <TextInput source="textAnswer4" />
      </SimpleForm>
    </Edit>
  );
};

export default SurveyEdit;