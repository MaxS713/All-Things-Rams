// LIBRARY IMPORTS
import * as React from "react";
import {Admin, Resource} from "react-admin";
import {Routes, Route} from "react-router-dom";
//reads the REST API JSON data
import jsonServerProvider from "ra-data-json-server";
// authentication security library
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
// import dataProvider from './dataProvider';
import myDataProvider from './myDataProvider';
import {fetchJson as httpClient} from './httpClient'
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


import TweetsList from './components/tweets/TweetsList';
import InstaList from './components/instagram/InstaList';
import NewsList from './components/news/NewsList';

import InstaUserList from './components/instagramUser/InstaUserList';
import InstaUserCreate from './components/instagramUser/InstaUserCreate';
import InstaUserEdit from './components/instagramUser/InstaUserEdit';

import TwitterUserList from './components/twitterUser/TwitterUserList';
import TwitterUserCreate from './components/twitterUser/TwitterUserCreate';
import TwitterUserEdit from './components/twitterUser/TwitterUserEdit';


// STYLE IMPORTS
import "./app.css";

const dataProvider = myDataProvider('http://localhost:5000/api', httpClient);

// APP FUNCTION
const AdminApp = () => {
    return (
      <div id="app" className="d-flex flex-column h-100">
        {/* dataProvider PROP that contains REST API info. */}
        <Admin dashboard={Dashboard} dataProvider={dataProvider}>
          {/* Inside the Admin component add Resource child components to use CRUD operations; list, create, edit, and show.*/}
          <Resource
            name="tweets"
            list={TweetsList}
          />
            <Resource
            name="instagramposts"
            list={InstaList}
          />
            <Resource
            name="newsarticles"
            list={NewsList}
          />
            <Resource
            name="instagramusers"
            list={InstaUserList}
            edit={InstaUserEdit}
            create={InstaUserCreate}
          />
            <Resource
            name="twitterusers"
            list={TwitterUserList}
            edit={TwitterUserEdit}
            create={TwitterUserCreate}
          />
        </Admin>
        <Footer />
      </div>
    );
};

export default withAuthenticationRequired(AdminApp, {
  onRedirecting: () => <Loading />,
});
