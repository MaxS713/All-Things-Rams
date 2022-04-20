import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
const SurveyCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput required source="surveyQuestion" />
        <TextInput required source="textAnswer1" />
        <TextInput required source="textAnswer2" />
        <TextInput source="textAnswer3" />
        <TextInput source="textAnswer4" />
      </SimpleForm>
    </Create>
  );
};

export default SurveyCreate;
