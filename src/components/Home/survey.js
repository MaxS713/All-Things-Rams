//Library Imports
import { LeafPoll, Result } from "react-leaf-polls";
import "./styles/leaf-poll.css";
import "./styles/survey.css"

// Persistent data array (typically fetched from the server)
const resData = [
  { text: "Answer 1", votes: 0 },
  { text: "Answer 2", votes: 0 },
];

function vote(item: Result, results: Result[]) {
  // Here you probably want to manage
  // and return the modified data to the server.
}

const customTheme = {
  textColor: "black",
  mainColor: "#040987",
  alignment: "center",
};

export default function Survey() {
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
              question="Survey Question"
              results={resData}
              theme={customTheme}
              onVote={vote}
            />
          </div>
        </div>
      </div>
    </>
  );
}
