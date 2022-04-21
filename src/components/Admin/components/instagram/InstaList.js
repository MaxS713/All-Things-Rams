import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
} from 'react-admin';

const TweetsList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField label="Post path" source="path" />
        <TextField source="author" />
        <TextField source="time" />
        <DeleteButton label="Delete" basepath="/instagramposts" />
      </Datagrid>
    </List>
  );
};

export default TweetsList;