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
        <TextField source="title" />
        <TextField source="time" />
        <TextField source="source" />
        <DeleteButton label="Delete" basepath="/newsarticles" />
      </Datagrid>
    </List>
  );
};

export default TweetsList;