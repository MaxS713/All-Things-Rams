// import admin root component from react-admin app library
import { Admin, Resource } from "react-admin";
// import jsonServerProvider from respective library
import jsonServerProvider from "ra-data-json-server";

// import custom ListGuesser component for posts
import {PostList, PostEdit, PostCreate} from "../admin-components/posts";
// import custom ListGuesser component for users
import {UserList} from "../admin-components/users";
import Dashboard from "../admin-components/Dashboard";

// create variable to hold REST API info
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
// create variable to hold the function that calls the Admin component with dataProvider PROP that contains REST API info.

const AdminApp = () => (
  <Admin dashboard={Dashboard} dataProvider={dataProvider}>
    {/* Inside the Admin component add Resource child components to use CRUD operations; list, create, edit, and show.*/}
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
    />
    <Resource name="users" list={UserList} />
  </Admin>
);

export default AdminApp;
