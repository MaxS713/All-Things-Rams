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
        <TextField label="Post path" source="path" />
        <TextField source="author" />
        <TextField source="time" />
        <DeleteButton label="Delete" basePath="/instagramposts" />
      </Datagrid>
    </List>
  );
};

export default TweetsList;