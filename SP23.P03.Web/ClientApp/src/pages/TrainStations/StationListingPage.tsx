import React from 'react';
import { Container, Divider, Grid, Segment } from 'semantic-ui-react';
import StationList from '../../components/StationList';
import useFindStation from '../../hooks/api/useFindStation';

export function StationListingPage(): React.ReactElement {

    const stations = useFindStation();
    
    return (
        <Container>
            <Segment>
                <Grid.Column>
                    <h1> Train Stations </h1>
                </Grid.Column>

                <Divider />

                <Grid.Row>
                    <StationList stations={stations} />
                </Grid.Row>
            </Segment>
        </Container>
    );
}