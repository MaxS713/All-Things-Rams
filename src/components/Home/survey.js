//Library Imports
import React, { useState, useEffect } from "react";
import { LeafPoll, Result } from "react-leaf-polls";
import "./styles/leaf-poll.css";
import "./styles/survey.css";

//Persistent data array (typically fetched from the server)

export default function Survey() {
  const [surveyData, setSurveyData] = useState([]);

  async function getSurveyData() {
    let data = await fetch("http://localhost:5000/get-survey-data");
    data = await data.json();
    setSurveyData(data);
  }
  useEffect(() => {
    getSurveyData();
  }, []);

  const customTheme = {
    textColor: "black",
    mainColor: "#00B87B",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  async function vote(item: Result, results: Result[]) {
    console.log(item.text);
    await fetch("http://localhost:5000/post-survey-vote", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(item),
    });
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
