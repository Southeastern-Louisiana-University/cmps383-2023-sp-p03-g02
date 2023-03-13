import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react"; 
import { routes } from '../constants/routeconfig';
import "./NavbarStyling.css"; 

export function Navbar() : React.ReactElement {
    return (
        <nav>
            <Menu className="nav-container">
                <Menu.Item
                    name='Home'
                    as={NavLink}
                    to={routes.home}
                    className="item"
                />

                { /* will need to update the path when page is made */ }
                <Menu.Item 
                    name='Trains'
                    as={NavLink}
                    to="/trains"
                />

                { /* will need to update path */ }
                <Menu.Item 
                    name='Stations'
                    as={NavLink}
                    to="/stations"
                />
            </Menu>
        </nav>
    );
}