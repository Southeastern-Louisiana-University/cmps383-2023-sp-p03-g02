import React, { useState } from 'react';
import { Button, Confirm, Container, Header, Icon, Input, Modal, Segment, Table } from 'semantic-ui-react';
import './StationListingPage.css';
import { useUser } from '../../components/AuthProvider';
import { CreateStationDto, TrainStationDto } from '../../types/types';
import useStations, { TrainStationsService } from '../../hooks/api/StationDataService';
import { Field, Form, Formik } from 'formik';
import { isUserAdmin } from '../../helpers/user';

type StationActionProps = {
    stations: TrainStationsService;
    station: TrainStationDto;
}

export function StationListingPage(): React.ReactElement<StationActionProps> {
    const user = useUser();
    const isAdmin = isUserAdmin(user); //thanks :)
    const stations = useStations();
    const [open, setOpen] = useState(false);

    const onCreate = async (values: CreateStationDto) => {
            await stations.createStation(values);
            setOpen(false);
    }

    const initialValues: CreateStationDto = {
        name: "",
        address: "",
    };
    
    return (
        <Container className="stations">
            <Header size="huge" attached> Train Stations </Header>

            <Segment attached>
                <Table columns={2}>
                    <Table.Header className="ui center aligned">
                        <Table.HeaderCell> Station </Table.HeaderCell>
                        <Table.HeaderCell> Address </Table.HeaderCell>

                        { isAdmin ? (
                            <>
                            <Table.HeaderCell>
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
                            </Table.HeaderCell>
                            </>
                        ) : (
                            <></>  
                        )}
                    </Table.Header>
                    {stations.stations.map(station => (
                        <Table.Body className="ui center aligned" key={station.id}>
                            <Table.Cell> {station.name} </Table.Cell>
                            <Table.Cell> {station.address} </Table.Cell>

                            {isAdmin ? (
                                <>
                                <Table.Cell singleLine>
                                    <StationDelete stations={stations} station={station} />
                                    <StationEdit stations={stations} station={station} />
                                </Table.Cell>
                                </>
                            ) : (
                                <></>
                            )}
                        </Table.Body>
                    ))}
                </Table>
            </Segment>
        </Container>
    );
}

/* 
*
* functions for deleting and editing a station
*
*/

const StationDelete: React.FC<StationActionProps> = ({ stations, station }) => {
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        await stations.deleteStation(station.id);
        setOpen(false);
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

const StationEdit: React.FC<StationActionProps> = ({ stations, station }) => {
    const [open, setOpen] = useState(false);

    const onEdit = async (values: CreateStationDto) => {
        await stations.updateStation(station.id, values);
        setOpen(false);
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