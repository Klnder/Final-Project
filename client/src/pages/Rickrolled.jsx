import React from "react";
import image from "./chris.png";
import sound from "./responseSong.mp3";
import "./rickrolled.css";
import ReactAudioPlayer from "react-audio-player";

export default function Prank() {
  return (
    <div className="prankcontainer">
      <img src={image} className="prankimg" />
      <ReactAudioPlayer src={sound} autoPlay />
    </div>
  );
}
