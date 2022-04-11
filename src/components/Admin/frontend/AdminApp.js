// import admin root component from react-admin app library
import { Admin, Resource } from "react-admin";
// import jsonServerProvider from respective library
import jsonServerProvider from "ra-data-json-server";

//Component Imports
// import the dashboard for a homepage
import Dashboard from "../admin-components/Dashboard";
// import custom ListGuesser component for posts
import { PostList, PostEdit, PostCreate } from "../admin-components/posts";
// import custom ListGuesser component for users
import { UserList } from "../admin-components/users";

//Icon Imports
//import icons to create variety between posts and users
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

// create variable to hold REST API info
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");
// create variable to hold the function that calls the Admin component with dataProvider PROP that contains REST API info.

const AdminApp = () => {
  return (
    <Admin dashboard={Dashboard} dataProvider={dataProvider}>
      {/* Inside the Admin component add Resource child components to use CRUD operations; list, create, edit, and show.*/}
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
      />
      <Resource name="users" list={UserList} icon={UserIcon} />
    </Admin>
  );
}

export default AdminApp;
