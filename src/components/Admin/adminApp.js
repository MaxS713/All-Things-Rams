// LIBRARY IMPORTS
import * as React from "react";
import {Admin, Resource} from "react-admin";
import {Routes, Route} from "react-router-dom";
//reads the REST API JSON data
import jsonServerProvider from "ra-data-json-server";
// authentication security library
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";

// LOCAL IMPORTS
// auth0 - made components
import {NavBar, Footer, Loading} from "./components";
import {Home, Profile, ExternalApi} from "./views";
import ProtectedRoute from "./auth/protected-route";

// admin - made components
// import the dashboard for a homepage
import Dashboard from "./components/Dashboard";
// import custom ListGuesser component for posts
import {PostList, PostEdit, PostCreate} from "./views/posts";
// import custom ListGuesser component for users
import {UserList} from "./views/users";

// STYLE IMPORTS
import "./app.css";

// variable cache
// create variable to hold REST API info
const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

// APP FUNCTION
const AdminApp = () => {
    return (
      <div id="app" className="d-flex flex-column h-100">
        {/* dataProvider PROP that contains REST API info. */}
        <Admin dashboard={Dashboard} dataProvider={dataProvider}>
          {/* Inside the Admin component add Resource child components to use CRUD operations; list, create, edit, and show.*/}
          <Resource
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={null}
          />
          <Resource name="users" list={UserList} icon={null} />
        </Admin>
        <Footer />
      </div>
    );
};

export default withAuthenticationRequired(AdminApp, {
  onRedirecting: () => <Loading />,
});
