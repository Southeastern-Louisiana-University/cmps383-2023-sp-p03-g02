import React from 'react';
import { Button, Container, Divider, Grid, Icon, Popup, Segment } from 'semantic-ui-react';
import StationList from '../../components/StationList';
import useFindStation from '../../hooks/api/useFindStation';
import './StationListingPage.css';
import { useUser } from '../../components/AuthProvider';
import { CreateStationDto } from '../../types/types';
import StationDataService from '../../hooks/api/StationDataService';
import { Form, Formik } from 'formik';

export function StationListingPage(): React.ReactElement {
    const user = useUser();
    const stations = useFindStation();
    const trainStation = StationDataService(user);

    const onCreate = async (values: CreateStationDto) => {
        await trainStation.createStation(values);
    }

    const initialValues: CreateStationDto = {
        name: "",
        address: "",
    };
    
    return (
        <Container className="stations">
            <Segment>

                {/* 
                    if user is not signed in & an admin/manager, they can only view the stations
                    if user meets req, they will be able to create, edit, and delete stations 
                */}

                { user ?  ( //this displays when the user is logged in
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <h1> Train Stations </h1>
                            </Grid.Column>

                            <Grid.Column>
                                <Formik initialValues={initialValues} onSubmit={onCreate}>
                                    <Popup
                                        as={Form}
                                        trigger={
                                            <Button positive compact floated='right'>
                                                <Icon name="plus" /> Create
                                            </Button>
                                        }
                                        on="click"
                                    >

                                        <div> popup info here!</div>
                                    </Popup>
                                </Formik>
                            </Grid.Column>
                        </Grid.Row>

                        <Divider />

                        <Grid.Row>
                            <StationList stations={stations} />
                        </Grid.Row>
                    </Grid>
                ) : ( //if not -- render just the stations listing
                    <Grid>
                        <Grid.Row>
                            <h1> Train Stations </h1>
                        </Grid.Row>

                        <Divider />
                    
                        <Grid.Row>
                            <StationList stations={stations} />
                        </Grid.Row>
                    </Grid>
                )}
            </Segment>
        </Container>
    );
}