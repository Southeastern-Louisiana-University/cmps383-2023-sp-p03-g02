import React from "react";
import { Divider, Grid, Header, Segment } from "semantic-ui-react";

export function Footer() : React.ReactElement {
    return (
        <div>
            <Segment placeholder>
                    <Grid columns={2}>

                        <Divider vertical />

                        <Grid.Row>
                            <Grid.Column>
                                <Header> EnTrack </Header>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                                culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Grid.Column>

                            <Grid.Column>
                                <Header>
                                    Need Something?
                                </Header>
                                
                                <p> Support </p>
                                <p> Mobile App </p>
                                <p> Contact Us </p>
                            </Grid.Column>
                            
                        </Grid.Row>
                    </Grid>
                </Segment>

                <Grid padded centered>
                    © 2023 EnTrack Transportation Corporation
                </Grid>
        </div>
    );
}