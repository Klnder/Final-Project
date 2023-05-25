import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header({ trips }) {
  const { logout, user } = useAuth0();
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
        <h1>Welcome to trip planner : {user.nickname}</h1>
      </div>
      <div id="main-menu">
        <h2 className="menu">Menu</h2>
        <div id="menu-list" className="navigation">
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
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
            <li>
              <NavLink to="/" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
