import React, { useState } from "react";
import { Button, Confirm, Container, Header, Icon, Input, Modal, Segment, Table } from "semantic-ui-react";
import './TrainListingPage.css';
import { CreateTrainDto, TrainDto } from "../../types/types";
import TrainDataService from "../../hooks/api/TrainDataService";
import { useUser } from "../../components/AuthProvider";
import useFindTrain from "../../hooks/api/useFindTrain";
import { Field, Form, Formik } from "formik";

type TrainActionProps = {
    trains: TrainDto[];
    train: TrainDto;
}

export function TrainListingPage(): React.ReactElement<TrainActionProps> {
    const user = useUser();
    const isAdmin = user?.roles.includes("Admin");
    const train = TrainDataService(user);
    const trains = useFindTrain();

    const [open, setOpen] = useState(false);

    const onCreate = async (values: CreateTrainDto) => {
        await train.createTrain(values);
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
                        className="create"
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
            </Table.Header>
            {trains.map(train => (
                <>
                <Table.Body className="ui center aligned">
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
                            <TrainDelete trains={trains} train={train} key={train.id} />
                            <Button color="yellow" compact> Edit </Button>
                        </Table.Cell>
                        </>
                    ) : (
                        <></>
                    )}
                </Table.Body>
                </>
            ))}
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

const TrainDelete: React.FC<TrainActionProps> = ({train}) => {
    const user = useUser();
    const trainService = TrainDataService(user);
    const [open, setOpen] = useState(false);

    function refreshPage() {
        window.location.reload();
    }

    const onDelete = async () => {
        await trainService.deleteTrain(train.id);
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
            content={'Are you sure?'}
        />
    )
}
