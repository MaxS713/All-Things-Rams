import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const SurveyList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField required source="surveyQuestion" />
        <EditButton label="Edit" basePath="/surveydatas" />
        <DeleteButton label="Delete" basePath="/surveydatas" />
      </Datagrid>
    </List>
  );
};

export default SurveyList;
