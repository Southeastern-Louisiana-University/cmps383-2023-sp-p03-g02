import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";

export function Footer() : React.ReactElement {
    return (
        <div>
            <Segment inverted padded>
                    <Grid columns={2}>

                        <Grid.Row>
                            <Grid.Column>
                                <Header className="header-style"> EnTrack </Header>

                                <p>
                                    is a transportation service located in the southern states
                                    of the United States of America. Our focus is on making
                                    the traveling experience, whether that be for work, personal,
                                    or vacation, as convenient as it can be. As one of the luxury
                                    transportation services, we take the hassle out of booking
                                    tickets and boarding. Our goal is to make traveling by train
                                    easier than traveling by airplane!
                                </p>
                            </Grid.Column>

                            <Grid.Column>
                                <Header className="header-style">
                                    Need Something?
                                </Header>
                                
                                <p> Support </p>
                                <p> Mobile App </p>
                                <p> Contact Us </p>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row padded centered className="header-style">
                            <div>
                                © 2023 EnTrack Transportation Corporation
                            </div>
                        </Grid.Row>
                    </Grid>
                </Segment>

{/*
                <Grid padded centered className="header-style">
                    © 2023 EnTrack Transportation Corporation
                </Grid>
 */}
        </div>
    );
}