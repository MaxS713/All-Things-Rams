import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from 'react-admin';

const TweetsList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField label="Tweet ID" source="ID" />
        <TextField source="author" />
        <TextField source="text" />
        <DeleteButton label="Delete" basepath="/tweets" />
      </Datagrid>
    </List>
  );
};

export default TweetsList;