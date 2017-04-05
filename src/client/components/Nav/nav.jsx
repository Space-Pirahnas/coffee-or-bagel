import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
  <div id="navigation" className="Navigation">
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile/:userid">Profile</Link></li>
        <li><Link to="/friends">Friends</Link></li>
        <li><Link to="/postevent">Create Event</Link></li>
        <li><Link to="/message">Message</Link></li>
      </ul>
    </nav>
  </div>
)

export default Nav;