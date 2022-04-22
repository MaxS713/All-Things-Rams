import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

import "../Styles/Admin.css"

const CustomArticleList = (props) => {
  return (
    <List {...props}>
      <Datagrid className="datagrid">
        <TextField source="title" required className ="text-field" />
        <TextField source="author" required />
        <TextField source="date" required />
        <EditButton className ="edit-button" label="Edit" basepath="/customarticles" />
        <DeleteButton className ="delete-button" label="Delete" basepath="/customarticles" />
      </Datagrid>
    </List>
  );
};

export default CustomArticleList;
