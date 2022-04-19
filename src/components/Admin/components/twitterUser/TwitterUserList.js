import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

const TwitterUserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="twitterHandle" />
        <TextField source="userID" />
        <EditButton label="Edit" basePath="/twitterusers" />
        <DeleteButton label="Delete" basePath="/twitterusers" />
      </Datagrid>
    </List>
  );
};

export default TwitterUserList;