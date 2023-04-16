import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

export function StationListingPage(): React.ReactElement {

    return (
        <>
            <Segment padded raised>
                <Grid>

                    <Grid.Row>
                        <Grid.Column>
                            <h1> Train Stations </h1>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                       
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    );
}