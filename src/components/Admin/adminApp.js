
import { Admin, Resource } from "react-admin";
//reads the REST API JSON data
// authentication security library
import { withAuthenticationRequired } from "@auth0/auth0-react";
// import dataProvider from './dataProvider';
import DataProvider from "./dataProvider";
import { fetchJson as httpClient } from "./httpClient";
// LOCAL IMPORTS
// auth0 - made components
import {Footer, Loading } from "./components";

// admin - made components
// import the dashboard for a homepage
import Dashboard from "./components/Dashboard";
// import custom ListGuesser component for posts


import TweetsList from "./components/tweets/TweetsList";
import InstaList from "./components/instagram/InstaList";
import NewsList from "./components/news/NewsList";

import SurveyList from "./components/survey/SurveyList";
import SurveyCreate from "./components/survey/SurveyCreate";
import SurveyEdit from "./components/survey/SurveyEdit";

import InstaUserList from "./components/instagramUser/InstaUserList";
import InstaUserCreate from "./components/instagramUser/InstaUserCreate";
import InstaUserEdit from "./components/instagramUser/InstaUserEdit";

import TwitterUserList from "./components/twitterUser/TwitterUserList";
import TwitterUserCreate from "./components/twitterUser/TwitterUserCreate";
import TwitterUserEdit from "./components/twitterUser/TwitterUserEdit";

import CustomArticleList from "./components/customArticle/CustomArticleList";
import CustomArticleCreate from "./components/customArticle/CustomArticleCreate";
import CustomArticleEdit from "./components/customArticle/CustomArticleEdit";

// STYLE IMPORTS
import "./app.css";

const dataProvider = DataProvider("http://localhost:5000/api", httpClient);

// APP FUNCTION
const AdminApp = () => {
  return (
    <div id="app" className="d-flex flex-column h-100">
      {/* dataProvider PROP that contains REST API info. */}
      <Admin basename="/admin-login" dashboard={Dashboard} dataProvider={dataProvider}>
        {/* Inside the Admin component add Resource child components to use CRUD operations; list, create, edit, and show.*/}
        <Resource name="tweets" list={TweetsList} />
        <Resource name="instagramposts" list={InstaList} />
        <Resource name="newsarticles" list={NewsList} />
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
        <Resource
          name="surveydatas"
          list={SurveyList}
          edit={SurveyEdit}
          create={SurveyCreate}
        />
        <Resource
          name="customarticles"
          list={CustomArticleList}
          edit={CustomArticleEdit}
          create={CustomArticleCreate}
        />
      </Admin>
      <Footer />
    </div>
  );
};

export default withAuthenticationRequired(AdminApp, {
  onRedirecting: () => <Loading />,
});
