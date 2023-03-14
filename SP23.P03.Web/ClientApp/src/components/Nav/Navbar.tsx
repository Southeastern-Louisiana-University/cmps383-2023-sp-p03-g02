import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react"; 
import { routes } from "../../constants/routeconfig";
import "./NavbarStyling.css"; 

export function Navbar() : React.ReactElement {
    return (
        <nav className="nav-container">

            <Menu
            secondary pointing
            className="item-container">
                
                <Menu.Item
                    name='Home'
                    icon="home"
                    as={NavLink}
                    to={routes.home}
                />

                { /* will need to update the path when page is made */ }
                <Menu.Item
                    name='Route Planning'
                    icon="map outline"
                    as={NavLink}
                    to="/routeplanning"
                />

                { /* will need to update path */ }
                <Menu.Item 
                    name='My Trips'
                    icon="travel"
                    as={NavLink}
                    to="/mytrips"
                />

                { /* will need to update path */}
                <Menu.Item position="right"
                    name='Cart'
                    icon="shopping cart"
                    as={NavLink}
                    to="/cart"
                />
                
            </Menu>

        </nav>
    );
}