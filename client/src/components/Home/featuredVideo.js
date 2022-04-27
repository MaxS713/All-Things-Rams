//Embed Content Import
import { YouTubeEmbed } from "react-social-media-embed";
import "./styles/featuredVideo.css"

export default function FeaturedVideo() {
  return (
    <>
      <div id="featured-video-container">
        <div className="container-header">
          <h2>Featured Video</h2>
        </div>
        <div className="container-content">
            <div id="youtube-wrapper">
              <div id="youtube-embed">
                <YouTubeEmbed
                  url="https://www.youtube.com/watch?v=HpCAHRcwbbc"
                  width="100%"
                  linkText="Loading"
                />
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
