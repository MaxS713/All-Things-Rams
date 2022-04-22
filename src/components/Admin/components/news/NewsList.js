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
        <TextField source="source" />
        <TextField label="Featured?" source="isFeatured" />
        <EditButton label="Edit" basepath="/newsarticles" />
        <DeleteButton label="Delete" basepath="/newsarticles" />
      </Datagrid>
    </List>
  );
};

export default TweetsList;