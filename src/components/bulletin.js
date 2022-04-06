import React, { useState, useEffect } from "react"
import { TwitterTweetEmbed } from "react-twitter-embed";
import { InstagramEmbed } from "react-social-media-embed";
import "../App.css";

export default function Bulletin() {
    const [latestTweets, setLatestTweets] = useState([]);

    async function getLatestRamsTweetIDs() {
        let tweetsIDs = await fetch(`http://localhost:5000/get-latest-tweets`);
        tweetsIDs = await tweetsIDs.json();
        setLatestTweets(tweetsIDs);
    }
    useEffect(() => {
        getLatestRamsTweetIDs();
    }, []);

    return (
        <>
            <div className="container">
                <div className="containerHead">
                    <h2>Containing....</h2>
                </div>
                <div className="containerContent">
                    <p>This!</p>
                </div>
            </div>
            <div id="tweets">
                {latestTweets.map((tweetID) => {
                    return <TwitterTweetEmbed tweetId={tweetID} />;
                })}
            </div>
            <div className="insta-embed">
                <InstagramEmbed
                    url="https://www.instagram.com/p/CZ8gpbzrenZ/"
                    width={328}
                />
            </div>
        </>
    );
}
