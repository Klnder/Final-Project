import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header({ user, trips }) {
  const { logout } = useAuth0();
  const subMenuTripElement = trips.map((trip) => {
    return (
      <li key={trip._id}>
        <NavLink to={`/viewtrip/${trip._id}`}>{trip.name}</NavLink>
      </li>
    );
  });
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
              <a href="#">View Trip</a>
              <ul>{subMenuTripElement}</ul>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
        </div>
      </div>
    </header>
  );
}
