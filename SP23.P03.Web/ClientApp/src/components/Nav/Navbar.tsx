import React from "react";
import { NavLink } from "react-router-dom";
import { Image, Menu } from "semantic-ui-react"; 
import { routes } from "../../constants/routeconfig";
import HomeLogo from '../../assets/EnTrack_HomeLogo.png';
import "./NavbarStyling.css"; 

export function Navbar() : React.ReactElement {
    return (
        <nav className="nav-container">

            <Menu
            borderless
            className="item-container">
                
                <Menu.Item
                    style={{ padding: 0 }}
                    content={<Image className="main-logo" src={HomeLogo} />}
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
                    name='Login'
                    icon="sign-in"
                    as={NavLink}
                    to="/login"
                />
                
            </Menu>

        </nav>
    );
}