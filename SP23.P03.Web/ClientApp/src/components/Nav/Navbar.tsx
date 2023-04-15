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

                <Menu.Item
                    name='Route Planning'
                    icon="map outline"
                    as={NavLink}
                    to={routes.route_planning}
                />

                <Menu.Item 
                    name='My Boarding Passes'
                    icon="travel"
                    as={NavLink}
                    to={routes.boardingpasses}
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