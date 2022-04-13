export default function VideoModal(props) {

  if (props.modalState === true) {
    return (
      <div className="video-frame">
        <iframe
          scrolling="no"
          src={props.src}
        ></iframe>
      </div>
    );
  } else {
    return null;
  }
}
