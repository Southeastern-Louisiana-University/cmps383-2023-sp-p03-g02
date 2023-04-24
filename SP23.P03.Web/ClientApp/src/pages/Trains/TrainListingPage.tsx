import React, { useState } from "react";
import { Button, Confirm, Container, Header, Icon, Input, Modal, Segment, Table } from "semantic-ui-react";
import './TrainListingPage.css';
import { CreateTrainDto, TrainDto } from "../../types/types";
import useTrains, { TrainsService } from "../../hooks/api/TrainDataService";
import { useUser } from "../../components/AuthProvider";
import { Field, Form, Formik } from "formik";
import { isUserAdmin } from "../../helpers/user";

type TrainActionProps = {
    trains: TrainsService;
    train: TrainDto;
}

export function TrainListingPage(): React.ReactElement<TrainActionProps> {
    const user = useUser();
    const isAdmin = isUserAdmin(user);
    const trains = useTrains();

    const [open, setOpen] = useState(false);

    const onCreate = async (values: CreateTrainDto) => {
        await trains.createTrain(values);
        setOpen(false);
    }
    
    const initialValues: CreateTrainDto = {
        name: "",
        status: "",
        coachCapacity: "",
        firstClassCapacity: "",
        roomletCapacity: "",
        sleeperCapacity: "",
    }

    return (
        <Container className="trains">
            <Header size="huge" attached> Trains </Header>

        <Segment attached>
        <Table columns={6}>
            <Table.Header className="ui center aligned">
                <Table.Row>
                    <Table.HeaderCell> Name </Table.HeaderCell>
                    <Table.HeaderCell> Status </Table.HeaderCell>
                    <Table.HeaderCell> Coach Capacity </Table.HeaderCell>
                    <Table.HeaderCell> First Class Capacity </Table.HeaderCell>
                    <Table.HeaderCell> Roomlet Capacity </Table.HeaderCell>
                    <Table.HeaderCell> Sleeper Capacity </Table.HeaderCell>

                    { isAdmin ? (
                        <>
                        <Table.HeaderCell>
                        <Formik initialValues={initialValues} onSubmit={onCreate}>
                        <Modal
                            as={Form}
                            trigger={
                                <Button positive compact floated="right">
                                    <Icon name="plus" /> Create
                                </Button>
                            }
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            onConfirm={onCreate}
                            className="trains create"
                        >  
                            <div>
                                <h2> Add Train </h2>
                                <div>
                                    <div className="form-group">
                                        <label> Name </label>
                                        <br/>
                                        <Field as={Input} id="name" name="name" />
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <label> Status </label>
                                        <br/>
                                        <Field as={Input} id="status" name="status" type="text" />
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <label> Coach Capacity </label>
                                        <br/>
                                        <Field as={Input} id="coachCapacity" name="coachCapacity" />
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <label> First Class Capacity </label>
                                        <br/>
                                        <Field as={Input} id="firstClassCapacity" name="firstClassCapacity" />
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <label> Roomlet Capacity </label>
                                        <br/>
                                        <Field as={Input} id="roomletCapacity" name="roomletCapacity" />
                                    </div>
                                    <br/>
                                    <div className="form-group">
                                        <label> Sleeper Capacity </label>
                                        <br/>
                                        <Field as={Input} id="sleeperCapacity" name="sleeperCapacity" />
                                    </div>
                                    <br/>
                                    <div>
                                        <Button negative type="button" onClick={() => setOpen(false)}> Close </Button>
                                        <Button positive type="submit" onConfirm={onCreate}> Submit </Button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        </Formik>
                        </Table.HeaderCell>
                        </>
                    ) : (
                        <></>
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {trains.trains.map(train => (
                    <Table.Row className="ui center aligned" key={train.id}>
                        <Table.Cell>
                            {train.name}
                        </Table.Cell>
                        <Table.Cell>
                            {train.status}
                        </Table.Cell>
                        <Table.Cell>
                            {train.coachCapacity}
                        </Table.Cell>
                        <Table.Cell>
                            {train.firstClassCapacity}
                        </Table.Cell>
                        <Table.Cell>
                            {train.roomletCapacity}
                        </Table.Cell>
                        <Table.Cell>
                            {train.sleeperCapacity}
                        </Table.Cell>

                        {isAdmin ? (
                            <>
                            <Table.Cell singleLine>
                                <TrainDelete trains={trains} train={train} />
                                <TrainEdit trains={trains} train={train} />
                            </Table.Cell>
                            </>
                        ) : (
                            <></>
                        )}
                    </Table.Row>
                ))}
            </Table.Body>
            </Table>
            </Segment>
            </Container>
    )
}

/*
*
* functions for deleting and editing a train
*
*/

const TrainDelete: React.FC<TrainActionProps> = ({trains, train}) => {
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        await trains.deleteTrain(train.id);
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
            content={'Are you sure?'}
        />
    )
}

const TrainEdit: React.FC<TrainActionProps> = ({ trains, train }) => {
    const [open, setOpen] = useState(false);

    const onEdit = async (values: CreateTrainDto) => {
        await trains.updateTrain(train.id, values);
        setOpen(false);
    }

    const initialValues: CreateTrainDto = {
        name: "",
        status: "",
        coachCapacity: "",
        firstClassCapacity: "",
        roomletCapacity: "",
        sleeperCapacity: "",
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onEdit}>
            <Modal
                as={Form}
                trigger={
                    <Button color="yellow" compact>
                        <Icon name="edit" /> Edit
                    </Button>
                }
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onConfirm={onEdit}
                className="trains create"
            >
                <div>
                            <h2> Add Train </h2>
                            <div>
                                <div className="form-group">
                                    <label> Name </label>
                                    <br/>
                                    <Field as={Input} id="name" name="name" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label> Status </label>
                                    <br/>
                                    <Field as={Input} id="status" name="status" type="text" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label> Coach Capacity </label>
                                    <br/>
                                    <Field as={Input} id="coachCapacity" name="coachCapacity" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label> First Class Capacity </label>
                                    <br/>
                                    <Field as={Input} id="firstClassCapacity" name="firstClassCapacity" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label> Roomlet Capacity </label>
                                    <br/>
                                    <Field as={Input} id="roomletCapacity" name="roomletCapacity" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <label> Sleeper Capacity </label>
                                    <br/>
                                    <Field as={Input} id="sleeperCapacity" name="sleeperCapacity" />
                                </div>
                                <br/>
                                <div>
                                    <Button negative type="button" onClick={() => setOpen(false)}> Close </Button>
                                    <Button positive type="submit" onConfirm={onEdit}> Submit </Button>
                                </div>
                            </div>
                        </div>
            </Modal>
        </Formik>
    )
}
