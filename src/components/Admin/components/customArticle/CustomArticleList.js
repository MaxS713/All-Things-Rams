import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const CustomArticleList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="title" required />
        <TextField source="author" required />
        <TextField source="date" required />
        <EditButton label="Edit" basepath="/customarticles" />
        <DeleteButton label="Delete" basepath="/customarticles" />
      </Datagrid>
    </List>
  );
};

export default CustomArticleList;
