import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
const TwitterUserCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput required source="twitterHandle" />
        <TextInput required source="userID" />
      </SimpleForm>
    </Create>
  );
};

export default TwitterUserCreate;
