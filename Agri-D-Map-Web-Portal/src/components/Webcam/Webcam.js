import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "@material-ui/core";
import useStyles from "./styles.js";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const WebcamCapture = (props) => {
  const classes = useStyles();

  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    props.handleImage(imageSrc);
  });

  const retake = () => {
    setImage("");
    props.handleImagePresent(false);
  };

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === "" ? (
          <Webcam
            audio={false}
            // height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            // width={300}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} alt="img" />
        )}
        {/* <input type="file" accept="image/*" capture="environment" />{" "} */}
      </div>
      <div>
        {image !== "" ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              retake();
            }}
            className={classes.webcamBtn}
            startIcon={<CameraAltIcon />}
          >
            Retake Image
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              capture();
            }}
            className={classes.webcamBtn}
            startIcon={<CameraAltIcon />}
          >
            Capture
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
