import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Icon, Menu } from "semantic-ui-react"; 
import { routes } from "../../constants/routeconfig";
import { logoutUser, useUser } from "../AuthProvider";
import { openLoginModal } from "../LoginModal";
import "./NavbarStyling.css"; 
import ExtraIcon from "../ExtraIcon";

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
                    to={routes.route_planning}
                />

                { /* will need to update path */ }
                <Menu.Item 
                    name='My Trips'
                    icon="travel"
                    as={NavLink}
                    to="/mytrips"
                />

                {user ? (
                    <Menu.Menu position="right">
                        <Dropdown
                            text={user.userName}
                            icon={
                                <>
                                    <Icon name="user" fitted />
                                    <Icon name="caret down" />
                                </>
                            }
                            item
                            className="user-dropdown"
                        >
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    text='My Account'
                                    icon="user"
                                    as={NavLink}
                                    to={routes.account}
                                />
                                <Dropdown.Item
                                    text='My Passengers'
                                    icon={<Icon><ExtraIcon size="xl" name="walking" /></Icon>}
                                    as={NavLink}
                                    to={routes.passengers}
                                />
                                <Dropdown.Item
                                    text='Logout'
                                    icon='sign-out'
                                    onClick={logoutUser}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
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