//Library Imports
import React, { useState, useEffect } from "react";
import { LeafPoll, Result } from "react-leaf-polls";
import axios from "axios";
import "react-leaf-polls/dist/index.css";
import "./styles/survey.css";

//Persistent data array (typically fetched from the server)

export default function Survey() {
  const [surveyData, setSurveyData] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [currentUserIP, setCurrentUserIP] = useState("");
  const [wrapperClass, setWrapperClass] = useState("survey-wrapper");
  const [surveyResults, setSurveyResults] = useState([]);

  async function getSurveyData() {
    let data = await fetch("api/get-survey-data");
    let res = await axios.get("https://geolocation-db.com/json/");
    data = await data.json();
    setSurveyData(data);
    setCurrentUserIP(res.data.IPv4);
    if (data.ipAddresses.includes(res.data.IPv4)) {
      setHasVoted(true);
      setWrapperClass("voted-survey-wrapper");
    }
    setSurveyResults([
      {
        id: 0,
        text: surveyData.textAnswer1,
        votes: surveyData.votesAnswer1,
      },
      {
        id: 1,
        text: surveyData.textAnswer2,
        votes: surveyData.votesAnswer2,
      },
    ]);
    if (surveyData.textAnswer3) {
      setSurveyResults(
        surveyResults.push({
          id: 3,
          text: surveyData.textAnswer3,
          votes: surveyData.votesAnswer3,
        })
      );
    }
    if (surveyData.textAnswer4) {
      setSurveyResults(
        surveyResults.push({
          id: 4,
          text: surveyData.textAnswer4,
          votes: surveyData.votesAnswer4,
        })
      );
    }
  }
  useEffect(() => {
    getSurveyData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const customTheme = {
    textColor: "black",
    mainColor: "#B0B3FC",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  async function vote(item: Result, results: Result[]) {
    item = { ...item, ip: currentUserIP };
    await fetch("api/post-survey-vote", {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(item),
    });
  }

  if (surveyData.length === 0) {
    return null;
  } else {
    return (
      <>
        <div id="survey-container">
          <div className="container-header">
            <h2>Survey</h2>
          </div>
          <div className="container-content">
            <div id={wrapperClass}>
              <LeafPoll
                type="multiple"
                question={surveyData.surveyQuestion}
                results={[
                  {
                    id: 0,
                    text: surveyData.textAnswer1,
                    votes: surveyData.votesAnswer1,
                  },
                  {
                    id: 1,
                    text: surveyData.textAnswer2,
                    votes: surveyData.votesAnswer2,
                  },
                ]}
                onVote={vote}
                isVoted={hasVoted}
                theme={customTheme}
              />
              {/* <div className="results">
                <p className="result">Results:</p>
                <p>
                  {surveyData.textAnswer1} :
                  {Math.round(
                    (surveyData.votesAnswer1 /
                      (surveyData.votesAnswer1 + surveyData.votesAnswer2)) *
                      100
                  )}
                  %
                </p>
                <p>
                  {surveyData.textAnswer2} :
                  {Math.round(
                    (surveyData.votesAnswer2 /
                      (surveyData.votesAnswer1 + surveyData.votesAnswer2)) *
                      100
                  )}
                  %
                </p> */}
                <p>
                  Total votes:
                  {surveyData.votesAnswer1 + surveyData.votesAnswer2 + surveyData.votesAnswer3 + + surveyData.votesAnswer4}
                </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
