import React from "react";
import "./About.css";
import { TextLoop } from "react-text-loop-ts";

export default function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About this project:</h2>
      <ul className="about-list">
        <li>This project is a MERN project using all the knowledge acquire during Tech Ed course</li>
        <li>The concept is to enter your trip details, and find all the useful information at the same place</li>
        <li>With all the informations at the same place, you can go on holidays with less stress !</li>
      </ul>

      <h2 className="about-title">Feature ideas to develop:</h2>
      <ul className="about-list">
        <li>Being able to see only trip incoming and develop a archive page</li>
        <li>Add transport informations (flight, bus, train...)</li>
        <li>Use a CSS Framework to help with responsiveness</li>
      </ul>
      <br />
      <h2 className="about-title">About Me:</h2>
      <ul className="about-list">
        <li>My Name is Jeremy Merlin</li>
        <li>I'm actually a Bartender</li>
        <li>
          <h2 className="cocktail-title">
            My favourite cocktails are :&nbsp;
            <TextLoop texts={[" Espresso Martini", " Mai Tai", " Negroni"]} interval={1500} />
          </h2>
        </li>
      </ul>
    </div>
  );
}
