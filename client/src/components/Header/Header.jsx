import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";

export default function Header({ user }) {
  return (
    <header>
      <div id="main-header">
        <h1>Welcome to trip planner {user.nickname}</h1>
      </div>
      <div id="main-menu">
        <h2>Menu</h2>
        <div id="menu-list" className="navigation">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/createtrip">Create Trip</NavLink>
            </li>
            <li className="has-sub">
              <NavLink to="/viewtrip">View Trip</NavLink>
              <ul>
                <li>
                  <a href="#">test</a>
                </li>
                <li>
                  <a href="#">test</a>
                </li>
                <li>
                  <a href="#">test</a>
                </li>
                <li>
                  <a href="#">test</a>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
