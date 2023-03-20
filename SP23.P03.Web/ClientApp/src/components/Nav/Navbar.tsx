import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react"; 
import { routes } from "../../constants/routeconfig";
import { logoutUser, useUser } from "../AuthProvider";
import { openLoginModal } from "../LoginModal";
import "./NavbarStyling.css"; 

export function Navbar() : React.ReactElement {
    const user = useUser();

    return (
        <nav className="nav-container">

            <Menu
            borderless
            className="item-container">
                
                <Menu.Item
                    style={{ padding: 0 }}
                    content={<div className="main-logo" />}
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

                {user ? (
                    <Menu.Item position="right"
                        name='Logout'
                        icon='sign-out'
                        onClick={logoutUser}
                    />
                ) : (
                    <Menu.Item position="right"
                        name='Login'
                        icon="sign-in"
                        onClick={openLoginModal}
                    />
                )}
                
            </Menu>

        </nav>
    );
}