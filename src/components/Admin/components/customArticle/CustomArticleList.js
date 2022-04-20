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
        <TextField source="content" required />
        <EditButton label="Edit" basePath="/customarticles" />
        <DeleteButton label="Delete" basePath="/customarticles" />
      </Datagrid>
    </List>
  );
};

export default CustomArticleList;
