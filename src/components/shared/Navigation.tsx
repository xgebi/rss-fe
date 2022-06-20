import React from 'react';
import { NavLink } from "react-router-dom";

import './navigation.css';

/**
 * Definition of a Navigation component
 *
 * @constructor
 */
export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'active' : '' }
            replace={true}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/feed/articles"
            className={({ isActive }) => isActive ? 'active' : '' }
            replace={true}
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/feed/episodes"
            className={({ isActive }) => isActive ? 'active' : '' }
            replace={true}
          >
            Podcasts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/subscriptions"
            className={({ isActive }) => isActive ? 'active' : '' }
            replace={true}
          >
            Subscriptions
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}