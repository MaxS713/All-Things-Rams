import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

const InstaUserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="fullName" />
        <TextField source="username" />
        <EditButton label="Edit" basepath="/instagramusers" />
        <DeleteButton label="Delete" basepath="/instagramusers" />
      </Datagrid>
    </List>
  );
};

export default InstaUserList;