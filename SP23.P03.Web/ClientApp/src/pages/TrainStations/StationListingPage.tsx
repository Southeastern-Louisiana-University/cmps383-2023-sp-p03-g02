import React, { useState } from 'react';
import { Button, Confirm, Container, Divider, Grid, Header, Icon, Input, List, Modal, Segment } from 'semantic-ui-react';
import StationList from '../../components/StationList';
import useFindStation from '../../hooks/api/useFindStation';
import './StationListingPage.css';
import { useUser } from '../../components/AuthProvider';
import { CreateStationDto, TrainStationDto } from '../../types/types';
import StationDataService from '../../hooks/api/StationDataService';
import { Field, Form, Formik } from 'formik';

type StationActionProps = {
    stations: TrainStationDto[];
    station: TrainStationDto;
}

export function StationListingPage(): React.ReactElement<StationActionProps> {
    const user = useUser();
    const isAdmin = user?.roles.includes("Admin"); //thanks :)
    const stations = useFindStation();
    const trainStation = StationDataService(user);
    const [open, setOpen] = useState(false);

    function refreshPage() {
        window.location.reload();
    }

    const onCreate = async (values: CreateStationDto) => {
            await trainStation.createStation(values);
            setOpen(false);
            refreshPage();
    }

    const initialValues: CreateStationDto = {
        name: "",
        address: "",
    };
    
    return (
        <Container className="stations">
            <Segment>

                { isAdmin ?  ( //this displays when the admin is logged in
                    <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <h1> Train Stations </h1>
                        </Grid.Column>

                        <Grid.Column>
                            <Formik initialValues={initialValues} onSubmit={onCreate}>
                                <Modal
                                    as={Form}
                                    trigger={
                                        <Button positive compact floated='right'>
                                            <Icon name="plus" /> Create
                                        </Button>
                                    }
                                    className="modal-content"
                                    onClose={() => setOpen(false)}
                                    onOpen={() => setOpen(true)}
                                    open={open}
                                    onConfirm={onCreate}
                                >

                                <div className="center-form">
                                    <h2> Add Station </h2>
                                        <div>
                                            <label><b> Station </b></label>
                                            <Field as={Input} id="name" name="name" />
                                        </div>
                                        <br/>
                                        <div>
                                            <label><b> Address </b></label>
                                            <Field as={Input} id="address" name="address" />
                                        </div>
                                        <br/>
                                        <Button negative type="button" onClick={() => setOpen(false)}> Close </Button>
                                        <Button type="submit" positive onConfirm={onCreate}> Submit </Button>
                                </div>
                                </Modal>
                            </Formik>
                        </Grid.Column>
                    </Grid.Row>

                    <Divider />

                    <Grid.Row>
                    <Grid.Column>
                        {stations.map(station => (
                            <div>
                                <List>
                                    <List.Item key={station.id}>
                                        <List.Icon>
                                            <i className="map signs icon"/>
                                        </List.Icon>

                                        <List.Content>
                                            <Header>
                                                {station.name}
                                            </Header>

                                            {station.address}
                                        </List.Content>
                                    </List.Item>

                                    <StationDelete stations={stations} station={station} key={station.id} />
                                    <StationEdit stations={stations} station={station} key={station.id} />
                                </List>
                                <br/>
                            </div>
                        ))}
                    </Grid.Column>
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

/* 
*
* functions for deleting and editing a station
*
*/

const StationDelete: React.FC<StationActionProps> = ({station}) => {
    const user = useUser();
    const trainStation = StationDataService(user);
    const [open, setOpen] = useState(false);

    function refreshPage() {
        window.location.reload();
    }

    const onDelete = async () => {
        await trainStation.deleteStation(station.id);
        setOpen(false);
        refreshPage();
    }

    return (
        <Confirm
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            trigger={
                <Button negative compact>
                    <Icon name="trash" /> Delete
                </Button>
            }
            onConfirm={onDelete}
            content={`Are you sure?`}
        />
    )
}

const StationEdit: React.FC<StationActionProps> = ({station}) => {
    const user = useUser();
    const trainStation = StationDataService(user);
    const [open, setOpen] = useState(false);

    function refreshPage() {
        window.location.reload();
    }

    const onEdit = async (values: CreateStationDto) => {
        await trainStation.updateStation(station.id, values);
        refreshPage();
    }

    const initialValues: CreateStationDto = {
        name: station.name,
        address: station.address
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onEdit} >
            <Modal
                as={Form}
                trigger={
                    <Button color="yellow" compact>
                        <Icon name="edit" /> Edit {/* why does it render differently? */}
                    </Button>
                }
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                onConfirm={onEdit}
                className="modal-content"
            >
                <div className="center-form">
                    <h2> Edit Station </h2>

                    <div>
                        <label><b> Station </b></label>
                        <Field as={Input} id="name" name="name" />
                    </div>
                        <br/>
                    <div>
                        <label><b> Address </b></label>
                        <Field as={Input} id="address" name="address" />
                    </div>
                        <br/>
                    <Button negative type="button" onClick={() => setOpen(false)}> Close </Button>
                    <Button type="submit" positive onConfirm={onEdit}> Submit </Button>
                </div>
            </Modal>
        </Formik>
    )
}