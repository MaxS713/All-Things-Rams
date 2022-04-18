//Library Imports
import React, { useState, useEffect } from "react";
import { LeafPoll, Result } from "react-leaf-polls";
import axios from 'axios'
import "./styles/leaf-poll.css";
import "./styles/survey.css";

//Persistent data array (typically fetched from the server)

export default function Survey() {
  const [surveyData, setSurveyData] = useState([]);
  const [currentUserIP, setCurrentUserIP] = useState('');

  async function getSurveyData() {
    let data = await fetch("http://localhost:5000/get-survey-data");
    data = await data.json();
    setSurveyData(data);
  }
  useEffect(() => {
    getSurveyData();
  }, []);

  async function getUserIP() {
    const res = await axios.get('https://geolocation-db.com/json/')
    setCurrentUserIP(res.data.IPv4)
  }
  useEffect(() => {
    getUserIP()
  }, []);

  const customTheme = {
    textColor: "black",
    mainColor: "#B0B3FC",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  async function vote(item: Result, results: Result[]) {
    console.log(results)
    item = {...item, ip: currentUserIP}
    let postVote = await fetch("http://localhost:5000/post-survey-vote", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(item),
    });
    let getStatus = await postVote.json();
    if(getStatus.status==="Already Voted"){
      alert("Looks like you already voted... Your vote hasn't been recorded");
    }
  }

  if (surveyData[0] === undefined) {
    return null;
  } else {
    return (
      <>
        <div id="survey-container">
          <div className="container-header">
            <h2>Survey</h2>
          </div>
          <div className="container-content">
            <div id="survey-wrapper">
              <LeafPoll
                type="multiple"
                question={surveyData[0].surveyQuestion}
                results={[
                  {
                    text: surveyData[0].textAnswer1,
                    votes: surveyData[0].votesAnswer1,
                  },
                  {
                    text: surveyData[0].textAnswer2,
                    votes: surveyData[0].votesAnswer2,
                  },
                ]}
                theme={customTheme}
                onVote={vote}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
