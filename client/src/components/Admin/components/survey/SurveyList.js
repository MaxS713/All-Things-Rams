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
        <EditButton label="Edit" basepath="/surveydatas" />
        <DeleteButton label="Delete" basepath="/surveydatas" />
      </Datagrid>
    </List>
  );
};

export default SurveyList;
